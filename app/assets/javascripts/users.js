$(document).ready(function() {
  var $getUsers = $('#get-users');
  var $userForm = $('#add-user-form');
  var $showUser = $('#show-user');
  var $userList = $('#user-list');
  var $showUserDetail = $('#show-user-detail');
  var $userFirstName = $('#user-first-name');
  var $userLastName = $('#user-last-name');
  var $userPhoneNumber = $('#user-phone-number');
  var BASEURL = "http://devpoint-ajax-example-server.herokuapp.com/api/v1";

  function loadUsers() {
    var $users = $("#users");
    $users.empty();
    $.ajax({
      type: 'GET',
      url: BASEURL + "/users",
      dataType: 'JSON'
    }).success(function(data) {
      for(var i = 0; i < data.length; i++) {
        var user = data[i];
        $users.append('<h4 id=' + user.id + '>' + '<i class="material-icons">person_pin</i>' + user.first_name + ': ' + ' <button class="waves-effect waves-light teal btn show-user"><i class="material-icons">visibility</i></button> <button class="waves-effect waves-light purple darken-4 btn edit-user"><i class="material-icons">mode_edit</i></button> <button class="waves-effect waves-light pink btn delete-user"><i class="material-icons">delete</i></button> </h4>');
      }
    }).fail(function(data) {
      console.log(data);
    });
  };


  $getUsers.click(function() {
    loadUsers();
  });

  $userForm.submit(function(e) {
    e.preventDefault();
    var requestType, requestUrl;
    if($(this).data('user-id')) {
      requestType = 'PUT'
      requestUrl = BASEURL + '/users/' + $(this).data('user-id');
    } else {
      requestType = 'POST';
      requestUrl = BASEURL + '/users';
    };
    // make ajax POST request
    $.ajax({
      type: requestType,
      url: requestUrl,
      dataType: 'JSON',
      data: { user: { first_name: $userFirstName.val(),
                     last_name: $userLastName.val(),
                     phone_number: $userPhoneNumber.val()
                     }}
    }).success(function(data) {
      $userForm[0].reset();
      $userFirstName.focus();
      loadUsers();
    }).fail(function(data) {
    });

  });

  $(document).on('click', '.edit-user', function() {
    var userId = $(this).parent().attr('id');
    $.ajax({
      type: 'GET',
      url: BASEURL + '/users/' + userId,
      dataType: 'JSON'
    }).success(function(data) {
      $userFirstName.val(data.first_name).focus();
      $userLastName.val(data.last_name);
      $userPhoneNumber.val(data.phone_number);
      $userForm.attr('data-user-id', userId);
    }).fail(function(data) {
    });
  });


  $(document).on('click', '.delete-user', function() {
    var userId = $(this).parent().attr('id');
    $.ajax({
      type: 'DELETE',
      url: BASEURL + '/users/' + userId,
      dataType: 'JSON'
    }).success(function(data) {
      $('#' + userId).remove();
      //$(this).data('message');
    }).fail(function(data) {
    });
  });

  $(document).on('click', '.show-user', function() {
    // find the id of the user of the page
    $userForm.hide();
    $userList.hide();
    var userId = $(this).parent().attr('id');
    //make ajax call to get the data of the user
    $.ajax({
      type: 'GET',
      url: BASEURL + '/users/' + userId,
      dataType: 'JSON'
    }).success(function(data){
      var user = data
      $showUserDetail.append("<div class='col m8'>" + "<div class='card-panel teal lighten-2'>" + "<span class='white-text'>" + "<i class='large material-icons'>person_identity</i>" + "<h3> Name: " + user.first_name + " " + user.last_name + "</h3>" + "<h5> Cell Phone: " + user.phone_number + "</h5>" + "</span>" + "</div>" + "</div>")
    }).fail(function(data) {
    });
  });

});


