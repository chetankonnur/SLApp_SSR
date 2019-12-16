<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>;

var settings = {
  async: true,
  crossDomain: true,
  url: "https://afternoon-coast-12049.herokuapp.com/about",
  method: "GET",
  headers: {
    Accept: "*/*",
    Host: "afternoon-coast-12049.herokuapp.com"
  }
};


const fun1 = (param) => {
  console.log('param---------------------------------> ',param);
  
  $.ajax(settings).done(function(response) {
    $("#replaceDiv").html(response);
  });
}

<div id="replaceDiv"></div>;
