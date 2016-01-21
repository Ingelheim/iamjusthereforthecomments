var parse, Post, Comment, currentPost;

function init() {
  // loader
  initializeParse();
  getPostWithComments();
}

function initializeParse() {
  parse = Parse.initialize("9If5XkhK0EhFhyKtNNSDeVModxMmd64t1uKI4E8q", "9jIqJCosME3fa6IwCovBN0TKeSodQfVnBA4dhGDG");
  Post = Parse.Object.extend("Post");
  Comment = Parse.Object.extend("Comment");
}

function reloadPage() {
  location.reload();
}

function addNewComment(text) {
  var comment = new Comment();
  comment.set("text", text);
  comment.set("post", currentPost);
  comment.save(null, {
    success: function(comment) {
      // alert('New object created with objectId: ' + comment.id);
      reloadPage();
    },
    error: function(comment, error) {
      // alert('Failed to create new object, with error code: ' + error.message);
    }
  });
}

function addCurrentPost(title, imageURL) {
  $('.post').append("<h1 class='post-title'>" + title + "</h1>");
  $('.post').append("<img class='post-image' src='" + imageURL + "'>");
}

function addComment(text) {
  $('.comments').append("<div class='comment-box'>" + text + "</div>");
}

function getAndAddAllCommentsFor(post) {
  var query = new Parse.Query(Comment);
  query.limit(1000);
  query.equalTo("post", post);

  query.find({
    success: function(comments) {
      var length = comments.length - 1
      for (var i = 0; i <= length; i++) {
        var comment = comments[i];
        var commentText = comment.get("text");
        var commentLocalizedDate = new Date(comment.get("createdAt"));

        addComment(commentText, commentLocalizedDate);
      }

      $(".wrapper").show();
      $(".loader").hide();
    },
    error: function(error) {
      // alert("Error: " + error.code + " " + error.message);
    }
  });
}

function getPostWithComments(){
  var query = new Parse.Query(Post);

  query.first({
    success: function(object) {
      currentPost = object;
      var url = currentPost.get("image").url();
      var title = currentPost.get("title");

      addCurrentPost(title, url);
      getAndAddAllCommentsFor(currentPost);
    },
    error: function(error) {
      // alert("Error: " + error.code + " " + error.message);
    }
  });
}

$(document).ready(function(){
  init();
  $('#comment').on('click', function() {
    addNewComment($('#commentText').val())
  })
})
