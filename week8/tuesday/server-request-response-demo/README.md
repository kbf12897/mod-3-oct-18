# Server Basics Demo
- Open the Network tab in dev tools and navigate to localhost:5000
- Show that the browser created a request that follows a protocol and sends it across a network to another computer called the "Server"
- The protocol is called HTTP (HyperText Transfer Protocol)
- The url and method are the most important parts because the server will look at those two to know how to respond (serve some resources, create a new resource in the database, update/delete an existing resource)
- The server responded also following the same protocol and adding a body to the response
- The browser will parse the html received and if there are any additional resources such as images, it will make subsequent http requests for those resources as well
- Tomorrow you'll learn how the server parses those requests, but today you'll have a better idea of how the browser generates those requests on the first place and the components of both the request and response
- The url bar is the most obvious one
- Clicking on links that modify the url is another one (click on "Create a Post"), show the http request
- Submiting forms is another way of generating an http request, show the elements tab to show how the form specified the url and method, submit a form title=guten tag & description=3rd post and show the http request
- Talk about what headers are, focus on Content-Type and Location and also talk about status code

## Part 2
- There are some tools to test all these different urls and methods that a server can parse without using a browser or without having to create forms to test them, enter postman
- Open postman, set the method to Post, and the url to /posts
- change content-type to application/x-www-form-urlencoded as that is the content type for html forms and set the body to title=bonjour &description=4th post
## What you've learn
- In order for the client to communicate with a server and ask for resources, it will generate an http request
- HTTP stands for hyper text transfer protocol, the most important parts of the http request are the verb and the url
- with the verb and url, the server can understand the request and generate and appropriate reponse
- postman is a tool to generate http requests without the browser