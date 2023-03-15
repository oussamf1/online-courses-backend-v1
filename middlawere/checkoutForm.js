const sendEmail = require("../util/sendEmail");
const Order = require("../models/order");
const { User } = require("../models/user");
const Course = require("../models/course");
const Availability = require("../models/availability");
const { compareAsc, format } = require("date-fns");
exports.changeDate = async (req, res, next) => {
  console.log("fdf");
  const order = await Order.find({ _id: req.params.id });
  const prevTutor = order[0].tutor;
  let dateString = order[0].date;
  day = dateString.substr(0, dateString.indexOf("-"));
  let time = dateString.substr(dateString.indexOf("-") + 1, dateString.length);
  const availability = await Availability.find({
    tutor: prevTutor,
  });
  console.log(day, time);
  availability[0].dates.forEach(function (date) {
    if (date.day == day && date.time == time) {
      date.reserved = false;
      console.log("tabdil");
    }
  });
  console.log(availability[0].dates);
  let classes = [];
  let oldDateYear = parseInt(order[0].listOfDates[0].substr(0, 4));
  let oldDateMonth = parseInt(order[0].listOfDates[0].substr(5, 2));
  let oldDateDay = parseInt(order[0].listOfDates[0].substr(8, 2));
  let s = req.body.form.date;

  var day = s.substr(0, s.indexOf("-"));
  console.log("day:", day);
  let t = s.substr(s.indexOf(",") + 1, s.length);
  console.log("tutor:", t);
  let da = s.substr(0, s.indexOf(","));
  var time1 = da.substr(s.indexOf("-") + 1, da.length);
  console.log("time :", time1);
  const d = new Date(oldDateYear, oldDateMonth - 1, oldDateDay - 7);
  if (day == "Monday") {
    for (let i = 0; i < 8; i++) {
      const d = new Date(oldDateYear, oldDateMonth - 1, oldDateDay - 7);
      d.setDate(d.getDate() + ((((7 - d.getDay()) % 7) + 1) % 7) + i * 7);
      classes.push(format(d, "yyyy-MM-dd"));
    }
  }
  if (day == "Tuesday") {
    for (let i = 0; i < 8; i++) {
      const d = new Date(oldDateYear, oldDateMonth - 1, oldDateDay);
      d.setDate(d.getDate() + ((((7 - d.getDay()) % 7) + 1) % 7) + i * 7 + 1);
      classes.push(format(d, "yyyy-MM-dd"));
    }
  }
  if (day == "Wednesday") {
    for (let i = 0; i < 8; i++) {
      const d = new Date(oldDateYear, oldDateMonth - 1, oldDateDay);
      d.setDate(d.getDate() + ((((7 - d.getDay()) % 7) + 1) % 7) + i * 7 + 2);
      classes.push(format(d, "yyyy-MM-dd"));
    }
  }
  if (day == "Thursday") {
    for (let i = 0; i < 8; i++) {
      const d = new Date(oldDateYear, oldDateMonth - 1, oldDateDay);
      d.setDate(d.getDate() + ((((7 - d.getDay()) % 7) + 1) % 7) + i * 7 + 3);
      classes.push(format(d, "yyyy-MM-dd"));
    }
  }
  if (day == "Friday") {
    for (let i = 0; i < 8; i++) {
      const d = new Date(oldDateYear, oldDateMonth - 1, oldDateDay);
      d.setDate(d.getDate() + ((((7 - d.getDay()) % 7) + 1) % 7) + i * 7 + 4);
      classes.push(format(d, "yyyy-MM-dd"));
    }
  }
  if (day == "Saturday") {
    for (let i = 0; i < 8; i++) {
      const d = new Date(oldDateYear, oldDateMonth - 1, oldDateDay);
      d.setDate(d.getDate() + ((((7 - d.getDay()) % 7) + 1) % 7) + i * 7 + 5);
      classes.push(format(d, "yyyy-MM-dd"));
    }
  }
  if (day == "Sunday") {
    for (let i = 0; i < 8; i++) {
      const d = new Date(oldDateYear, oldDateMonth - 1, oldDateDay);
      d.setDate(d.getDate() + ((((7 - d.getDay()) % 7) + 1) % 7) + i * 7 + 6);
      classes.push(format(d, "yyyy-MM-dd"));
    }
  }
  const availabilityNewTutor = await Availability.find({
    tutor: t,
  });
  availabilityNewTutor[0].dates.forEach(function (date) {
    if (date.day == day && date.time == time1) {
      console.log("d5alnaa");
      date.reserved = true;
    }
  });

  order[0].listOfDates = classes;
  order[0].date = da;
  order[0].tutor = t;
  await order[0].save();
  await availabilityNewTutor[0].save();
  await availability[0].save();
};
exports.fillForm = async (req, res, next) => {
  console.log(req.body.form.type);
  const user = await User.findById(req.user._id);
  const course = await Course.findById(req.params.id);
  let classes = [];
  let s = req.body.form.date;
  var day = s.substr(0, s.indexOf("-"));
  var time = s.substr(s.indexOf("-") + 1, s.length);
  if (req.body.form.type == "trial") {
    if (day == "Monday") {
      if (req.body.form.startingWeek == "after one week") {
        const d = new Date();
        d.setDate(d.getDate() + ((((7 - d.getDay()) % 7) + 1) % 7));
        classes.push(format(d, "yyyy-MM-dd"));
      } else {
        console.log("after two weeks");
        console.log("condition is verifited");
        const d = new Date();
        d.setDate(d.getDate() + (((((7 - d.getDay()) % 7) + 1) % 7) + 7));
        classes.push(format(d, "yyyy-MM-dd"));
      }
    }
    if (day == "Tuesday") {
      console.log(req.body.form.startingWeek);
      if (req.body.form.startingWeek == "after one week") {
        const d = new Date();
        d.setDate(d.getDate() + ((((7 - d.getDay()) % 7) + 1) % 7) + 1);
        classes.push(format(d, "yyyy-MM-dd"));
      } else {
        console.log("after two weeks");
        console.log("condition is verifited");
        const d = new Date();
        d.setDate(d.getDate() + ((((7 - d.getDay()) % 7) + 1) % 7) + 1 + 7);
        classes.push(format(d, "yyyy-MM-dd"));
      }
    }
    if (day == "Wednesday") {
      if (req.body.form.startingWeek == "after one week") {
        const d = new Date();
        d.setDate(d.getDate() + ((((7 - d.getDay()) % 7) + 1) % 7) + 2);
        classes.push(format(d, "yyyy-MM-dd"));
      } else {
        console.log("after two weeks");
        console.log("condition is verifited");
        const d = new Date();
        d.setDate(d.getDate() + ((((7 - d.getDay()) % 7) + 1) % 7) + 2 + 7);
        classes.push(format(d, "yyyy-MM-dd"));
      }
    }
    if (day == "Thursday") {
      if (req.body.form.startingWeek == "after one week") {
        const d = new Date();
        d.setDate(d.getDate() + ((((7 - d.getDay()) % 7) + 1) % 7) + 3);
        classes.push(format(d, "yyyy-MM-dd"));
      } else {
        console.log("after two weeks");
        console.log("condition is verifited");
        const d = new Date();
        d.setDate(d.getDate() + ((((7 - d.getDay()) % 7) + 1) % 7) + 3 + 7);
        classes.push(format(d, "yyyy-MM-dd"));
      }
    }
    if (day == "Friday") {
      if (req.body.form.startingWeek == "after one week") {
        const d = new Date();
        d.setDate(d.getDate() + ((((7 - d.getDay()) % 7) + 1) % 7) + 4);
        classes.push(format(d, "yyyy-MM-dd"));
      } else {
        console.log("after two weeks");
        console.log("condition is verifited");
        const d = new Date();
        d.setDate(d.getDate() + ((((7 - d.getDay()) % 7) + 1) % 7) + 4 + 7);
        classes.push(format(d, "yyyy-MM-dd"));
      }
    }
    if (day == "Saturday") {
      if (req.body.form.startingWeek == "after one week") {
        const d = new Date();
        d.setDate(d.getDate() + ((((7 - d.getDay()) % 7) + 1) % 7) + 5);
        classes.push(format(d, "yyyy-MM-dd"));
      } else {
        console.log("after two weeks");
        console.log("condition is verifited");
        const d = new Date();
        d.setDate(d.getDate() + ((((7 - d.getDay()) % 7) + 1) % 7) + 5 + 7);
        classes.push(format(d, "yyyy-MM-dd"));
      }
    }
    if (day == "Sunday") {
      if (req.body.form.startingWeek == "after one week") {
        const d = new Date();
        d.setDate(d.getDate() + ((((7 - d.getDay()) % 7) + 1) % 7) + 6);
        classes.push(format(d, "yyyy-MM-dd"));
      } else {
        console.log("after two weeks");
        console.log("condition is verifited");
        const d = new Date();
        d.setDate(d.getDate() + ((((7 - d.getDay()) % 7) + 1) % 7) + 6 + 7);
        classes.push(format(d, "yyyy-MM-dd"));
      }
    }
  }
  if (req.body.form.type == "regular") {
    if (day == "Monday") {
      console.log("Regular Monday booking");
      if (req.body.form.startingWeek == "after one week") {
        console.log("after one week");
        for (let i = 0; i < 8; i++) {
          console.log("condition is verifited");
          const d = new Date();
          d.setDate(d.getDate() + ((((7 - d.getDay()) % 7) + 1) % 7) + i * 7);
          classes.push(format(d, "yyyy-MM-dd"));
        }
      } else {
        console.log("after two weeks");
        for (let i = 0; i < 8; i++) {
          console.log("condition is verifited");
          const d = new Date();
          d.setDate(
            d.getDate() + ((((7 - d.getDay()) % 7) + 1) % 7) + i * 7 + 7
          );
          classes.push(format(d, "yyyy-MM-dd"));
        }
      }
    } else if (day == "Tuesday") {
      console.log("Regular Tuesday booking");
      console.log(req.body);
      if (req.body.form.startingWeek == "after one week") {
        console.log("after one week");
        for (let i = 0; i < 8; i++) {
          console.log("condition is verifited");
          const d = new Date();
          d.setDate(
            d.getDate() + ((((7 - d.getDay()) % 7) + 1) % 7) + i * 7 + 1
          );
          classes.push(format(d, "yyyy-MM-dd"));
        }
      } else {
        console.log("after two weeks");
        for (let i = 0; i < 8; i++) {
          console.log("condition is verifited");
          const d = new Date();
          d.setDate(
            d.getDate() + ((((7 - d.getDay()) % 7) + 1) % 7) + i * 7 + 7 + 1
          );
          classes.push(format(d, "yyyy-MM-dd"));
        }
      }
    } else if (day == "Wednesday") {
      if (req.body.form.startingWeek == "after one week") {
        console.log("after one week");
        for (let i = 0; i < 8; i++) {
          console.log("condition is verifited");
          const d = new Date();
          d.setDate(
            d.getDate() + ((((7 - d.getDay()) % 7) + 1) % 7) + i * 7 + 2
          );
          classes.push(format(d, "yyyy-MM-dd"));
        }
      } else {
        console.log("after two weeks");
        for (let i = 0; i < 8; i++) {
          console.log("condition is verifited");
          const d = new Date();
          d.setDate(
            d.getDate() + ((((7 - d.getDay()) % 7) + 1) % 7) + i * 7 + 7 + 2
          );
          classes.push(format(d, "yyyy-MM-dd"));
        }
      }
    } else if (day == "Thursday") {
      if (req.body.form.startingWeek == "after one week") {
        console.log("after one week");
        for (let i = 0; i < 8; i++) {
          console.log("condition is verifited");
          const d = new Date();
          d.setDate(
            d.getDate() + ((((7 - d.getDay()) % 7) + 1) % 7) + i * 7 + 3
          );
          classes.push(format(d, "yyyy-MM-dd"));
        }
      } else {
        console.log("after two weeks");
        for (let i = 0; i < 8; i++) {
          console.log("condition is verifited");
          const d = new Date();
          d.setDate(
            d.getDate() + ((((7 - d.getDay()) % 7) + 1) % 7) + i * 7 + 7 + 3
          );
          classes.push(format(d, "yyyy-MM-dd"));
        }
      }
    } else if (day == "Friday") {
      if (req.body.form.startingWeek == "after one week") {
        console.log("after one week");
        for (let i = 0; i < 8; i++) {
          console.log("condition is verifited");
          const d = new Date();
          d.setDate(
            d.getDate() + ((((7 - d.getDay()) % 7) + 1) % 7) + i * 7 + 4
          );
          classes.push(format(d, "yyyy-MM-dd"));
        }
      } else {
        console.log("after two weeks");
        for (let i = 0; i < 8; i++) {
          console.log("condition is verifited");
          const d = new Date();
          d.setDate(
            d.getDate() + ((((7 - d.getDay()) % 7) + 1) % 7) + i * 7 + 7 + 4
          );
          classes.push(format(d, "yyyy-MM-dd"));
        }
      }
    } else if (day == "Saturday") {
      if (req.body.form.startingWeek == "after one week") {
        console.log("after one week");
        for (let i = 0; i < 8; i++) {
          console.log("condition is verifited");
          const d = new Date();
          d.setDate(
            d.getDate() + ((((7 - d.getDay()) % 7) + 1) % 7) + i * 7 + 5
          );
          classes.push(format(d, "yyyy-MM-dd"));
        }
      } else {
        console.log("after two weeks");
        for (let i = 0; i < 8; i++) {
          console.log("condition is verifited");
          const d = new Date();
          d.setDate(
            d.getDate() + ((((7 - d.getDay()) % 7) + 1) % 7) + i * 7 + 7 + 5
          );
          classes.push(format(d, "yyyy-MM-dd"));
        }
      }
    } else if (day == "Sunday") {
      if (req.body.form.startingWeek == "after one week") {
        console.log("after one week");
        for (let i = 0; i < 8; i++) {
          console.log("condition is verifited");
          const d = new Date();
          d.setDate(
            d.getDate() + ((((7 - d.getDay()) % 7) + 1) % 7) + i * 7 + 6
          );
          classes.push(format(d, "yyyy-MM-dd"));
        }
      } else {
        console.log("after two weeks");
        for (let i = 0; i < 8; i++) {
          console.log("condition is verifited");
          const d = new Date();
          d.setDate(
            d.getDate() + ((((7 - d.getDay()) % 7) + 1) % 7) + i * 7 + 7 + 6
          );
          classes.push(format(d, "yyyy-MM-dd"));
        }
      }
    }
  }
  if (req.body.form.type == "trial") {
    da = req.body.form.date;
    let t = "tutor will be assiged later";
    let order = new Order({
      tutor: t,
      user: req.user,
      course: req.params.id,
      studentName: req.body.form.studentName,
      numberOfClasses: req.body.form.numberOfClasses,
      courseTitle: course.title,
      firstName: user.firstName,
      lastName: user.lastName,
      finalPrice: req.body.form.numberOfClasses * course.price,
      date: da,
      orderDate: new Date(),
      listOfDates: classes,
      type: req.body.form.type,
    });
    await order.save();
  } else {
    console.log(user);
    let t = req.body.form.date;
    let da = t.substr(0, t.indexOf(","));
    t = t.substr(t.indexOf(",") + 1, t.length);
    console.log(t);
    let order = new Order({
      tutor: t,
      user: req.user,
      course: req.params.id,
      studentName: req.body.form.studentName,
      numberOfClasses: req.body.form.numberOfClasses,
      courseTitle: course.title,
      firstName: user.firstName,
      lastName: user.lastName,
      finalPrice: req.body.form.numberOfClasses * course.price,
      date: da,
      orderDate: new Date(),
      listOfDates: classes,
      type: req.body.form.type,
    });
    console.log("everything is okay");
    console.log(order);
    await order.save();
  }

  next();
};
exports.cancelDate = async (req, res, next) => {
  let classes = [];
  const order = await Order.findById(req.params.id);
  console.log(req.body.form.date);
  let oldDateYear = parseInt(req.body.form.date.substr(0, 4));
  let oldDateMonth = parseInt(req.body.form.date.substr(5, 2));
  let oldDateDay = parseInt(req.body.form.date.substr(8, 2));
  let d = new Date(oldDateYear, oldDateMonth - 1, oldDateDay);
  order.listOfDates.forEach(function (date) {
    let oldDateYear = parseInt(date.substr(0, 4));
    let oldDateMonth = parseInt(date.substr(5, 2));
    let oldDateDay = parseInt(date.substr(8, 2));
    dc = new Date(oldDateYear, oldDateMonth - 1, oldDateDay);
    if (dc >= d) {
      dc.setDate(dc.getDate() + 7);
    }
    classes.push(format(dc, "yyyy-MM-dd"));
  });
  order.listOfDates = classes;
  console.log(order.listOfDates);
  await order.save();
  await sendEmail("oussamafathallah854@gmail.com", "a class was cancelled");
};
