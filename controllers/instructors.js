// filesystem
const fs = require('fs');
const data = require('../data.json');
const { age, date } = require('../utils');
const Intl = require('intl');

exports.index = function (req, res) {
    return res.render('instructors/index', { instructors: data.instructors });
}

// create
exports.post = function (req, res) {
    // mostra as keys do objeto
    const keys = Object.keys(req.body);

    for (key of keys) {

        if (req.body[key] == "") {
            return res.send('Please, fill in all the fields');
        }
    }

    let { avatar_url, name, birth, gender, services } = req.body;

    birth = Date.parse(birth);
    const created_at = Date.now();
    const id = Number(data.instructors.length + 1);


    // Adiciona as informações ao array
    data.instructors.push({
        id: Number(id),
        avatar_url,
        name,
        birth,
        gender,
        services,
        created_at
    }
    );

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
        if (err) return res.send("Write file error");

        return res.redirect(`instructors/${id}`);
    })
}

// show
exports.show = function (req, res) {
    const { id } = req.params;

    const foundInstructor = data.instructors.find(function (instructor) {
        return instructor.id == id;
    })

    if (!foundInstructor) return res.send('Instructor not found');


    const instructor = {
        ...foundInstructor,
        age: age(foundInstructor.birth),
        services: foundInstructor.services.split(","),
        created_at: new Intl.DateTimeFormat('pt-BR').format(foundInstructor.created_at)
    }

    return res.render('instructors/show', { instructor: instructor });
}

// edit
exports.edit = function (req, res) {
    const { id } = req.params;

    const foundInstructor = data.instructors.find(function (instructor) {
        return instructor.id == id;
    })

    if (!foundInstructor) return res.send('Instructor not found');

    const instructor = {
        ...foundInstructor,
        birth: date(foundInstructor.birth).iso,
        id: Number(req.params.id)
    }

    return res.render('instructors/edit', { instructor })
}

// put
exports.put = function (req, res) {
    const { id } = req.body;
    let index = 0;

    console.log(req.body);

    const foundInstructor = data.instructors.find(function (instructor, foundIndex) {
        if (instructor.id == id) {
            index = foundIndex;
            return true;
        }
    })

    if (!foundInstructor) return res.send('Instructor not found');

    const instructor = {
        ...foundInstructor,
        ...req.body,
        birth: Date.parse(req.body.birth)
    }

    data.instructors[index] = instructor;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
        if (err) return res.send('Write error!');

        return res.redirect(`/instructors/${id}`);
    })

}

exports.create = function (req, res) {
    return res.render('instructors/create');
}

// delete
exports.delete = function (req, res) {
    const { id } = req.body;

    const filteredInstructors = data.instructors.filter(function (instructor) {
        return instructor.id != id
    })

    data.instructors = filteredInstructors;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
        if (err) return res.send("Write file error");

        return res.redirect('/instructors');
    })
}