const { age, date } = require('../../lib/utils');
const Intl = require('intl');

module.exports = {
    index(req, res){
        return res.render('members/index');
    },
    post(req, res){
        // mostra as keys do objeto
    const keys = Object.keys(req.body);

    for (key of keys) {

        if (req.body[key] == "") {
            return res.send('Please, fill in all the fields');
        }
    }

    let { avatar_url, name, birth, gender, services } = req.body;

    return
    },
    show(req, res){
        return
    },
    edit(req, res){
        
        return 
    },
    put(req, res){
        const keys = Object.keys(req.body);

        for (key of keys) {

            if (req.body[key] == "") {
                return res.send('Please, fill in all the fields');
            }
        }
       return
    },
    create(req, res){
        return res.render('members/create');
    },
    delete(req, res){
        return
    }
}
