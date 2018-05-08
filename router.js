const router = new Router.default();
var outlet = $('.outlet')

router.getHandler = function (name) { return myHandlers[name] }
router.updateURL = url => window.location.hash = url;

router.map(function (match) {
    match("/home").to("homeIndex");
    match("/about").to("aboutIndex");
    match("/contact").to("contactIndex");
});


const myHandlers = {
    homeIndex: {
        model: function () {
            return request("https://jsonplaceholder.typicode.com/users");
        },
        setup: function (t) {
            console.log("home", t);
            view('home', t)
            // render a template with the posts
        }
    },
    aboutIndex: {
        setup: function () {
            console.log("about")
            // render a template with the posts
            view('about')
        }
    },
    contactIndex: {
        setup: function () {
            console.log("contact")
            // render a template with the posts
            view('contact')
        }
    }
};

const startRouting = () => router.handleURL(window.location.hash.replace('#', ''));

$(window).on('hashchange', startRouting);

startRouting();

const view = (name, users = null) => {
    $.ajax({
        url: `templates/${name}.handlebars`, //ex. js/templates/mytemplate.handlebars
        cache: true,
        success: function (data) {
            var template = Handlebars.compile(data)({ users: users });
            outlet.html(template)
        }
    });
}

const request = (req) => {
    return $.get({
        url: req, //ex. js/templates/mytemplate.handlebars
        success: function (data) {
            return data
        }
    });
}

// $(window).on('hashchange', function () {

//     $(".nav li a").each(function (e) {
//         var a = $(this).attr('href')
//         if (a == location.hash) {
//             $(this).closest('li').addClass('active')
//         }else{
//             $(this).closest('li').removeClass('active')
//         }
//     })
// })



// $("li").click(
//     function(event) {
//       $('li').removeClass('active')
//       $(event.target.parentNode).addClass('active')
//     }
// );