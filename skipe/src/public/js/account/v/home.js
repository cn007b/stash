define([
    '/js/account/c/chat.js',
    '/js/account/c/contact.js',
    '/js/account/c/post.js',
    'text!/js/account/t/home.tpl.html',
    'text!/js/account/t/mainChats.tpl.html'
], function (cChat, cContact, cPost, t, tChats) {
    return  Backbone.skipeView.extend({
        cChat: new cChat(),
        cContact: new cContact(),
        cPost: new cPost(),
        tpl: t,
        tplChats: tChats,
        events:{
        },
        initialize: function () {
            this.cContact.on('afterGetContacts', this.afterGetContacts, this);
            this.cPost.on('afterGetPosts', this.afterGetPosts, this);
            this.cChat.on('afterGetChats', this.afterGetChats, this);
        },
        go: function () {
            this.renderIf();
            this.activate();
            app.views.app.hideLoading();
        },
        render: function () {
            this.$el.html(_.template(this.tpl));
        },
        activate: function () {
            this.getChats();
        },
        getChats: function () {
            this.cChat.hash = 'getChats/user/'+app.views.account.userId;
            this.cChat.fetch({
                success: function (c, r) {
                    c.trigger('afterGetChats', r);
                }
            });
        },
        afterGetChats: function (r) {
            this.renderChats(r);
            this.getPosts();
        },
        renderChats: function (d) {
            this.$('#mainChats').html(_.template(this.tplChats)({data: d}));
            $('#mainChats .list-group a:first').addClass('active');
        },
        getPosts: function () {
            this.cPost.hash = 'getPosts/chat/'+this.getActiveChatId();
            this.cPost.fetch({
                success: function (c, r) {
                    c.trigger('afterGetPosts', r);
                }
            });
        },
        getActiveChatId: function () {
            return this.$('#mainChats .list-group .active').attr('data-chat');
        },
        afterGetPosts: function (r) {
            console.log(r);
        },
        getContacts: function (r) {
            this.cContact.hash = 'getContacts/user/'+this.user.get('_id');
            this.cContact.fetch({
                success: function (c, r) {
                    c.trigger('afterGetContacts', r);
                }
            });
        },
        afterGetContacts: function (r) {
            console.dir(r);
        },
    });
});
