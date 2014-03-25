var actions = {
    POST: {},
};

actions.POST.registration = function (req, res) {
    req.checkBody('email', 'Invalid email').isEmail();
    req.checkBody('sname', 'Invalid screen name').matches(global.validator.patterns.sname); // or .is()
    var e = req.validationErrors();
    if (e) {
        res.json({errors: e});
        return;
    }
    global.mongo.collection('user', function (err, collection) {
        if (err) {
            res.json({errors: err});
        } else {
            collection.findOne({email: req.param('email')}, {_id: 1}, function (err, doc) {
                if (err) {
                    res.json({errors: err});
                    return;
                }
                if (doc) {
                    res.json({errors: [{param: 'email', msg: 'This email address has already exists.'}]});
                    return;
                }
                collection.insert({
                    email: req.param('email'),
                    sname: req.param('sname'),
                    password: require('crypto').randomBytes(5).toString('hex'),
                }, function (err, docs) {
                    if (err) {
                        res.json({errors: err});
                        return;
                    }
                    var args = {
                        email: docs[0].email,
                        sname: docs[0].sname,
                        password: docs[0].password,
                    };
                    res.render('registrationEmail', args, function(err, html) {
                        if (err) {
                            res.json({errors: err});
                            return;
                        }
                        global.mail.sendMail({
                            to: docs[0].email,
                            subject: '☺ Your Skipe address, '+docs[0].email+', has been created!',
                            html: html,
                        }, function (err, r) {
                            if (err) {
                                res.json({errors: err});
                            } else {
                                res.json({success: true});
                            }
                        });
                    });
                });
            });
        }
    });
};

actions.POST.logIn = function (req, res) {
    req.checkBody('type', 'Invalid login type').matches(/^(email|sname)$/);
    req.checkBody('password', 'Invalid password').matches(/^\w{10}$/);
    var e = req.validationErrors();
    switch (req.param('type')) {
        case 'email':
            req.checkBody('token', 'Invalid email').isEmail();
            var find = {email: req.param('token')};
            break;
        case 'sname':
            req.checkBody('token', 'Invalid screen name').matches(global.validator.patterns.sname);
            var find = {sname: req.param('token')};
            break;
        default:
            e.push({param: 'token', msg: 'Invalid '+req.param('type')+'.'});
    }
    if (e) {
        res.json({errors: e});
        return;
    }
    global.mongo.collection('user', function (err, collection) {
        if (err) {
            res.json({errors: err});
        } else {
            collection.findOne(find, function (err, doc) {
                if (err) {
                    res.json({errors: err});
                    return;
                }
                if (!doc) {
                    res.json({errors: [{param: 'token', msg: 'User with this '+req.param('type')+' not found.'}]});
                    return;
                }
                if (doc) {
                    if (doc.password != req.param('password')) {
                        res.json({errors: [{param: 'password', msg: 'Wrong password.'}]});
                        return;
                    }
                    req.session.user = doc;
                    res.json({success: true});
                }
            });
        }
    });
};

exports.go = function (req, res) {
    if (req.method in actions && req.param('action') in actions[req.method]) {
        actions[req.method][req.param('action')](req, res);
    }
};
