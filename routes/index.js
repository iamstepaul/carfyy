const express = require("express")
const router = express.Router()

router.get("/", (req, res) =>{
    res.render("pages/index")
})
router.route("/about").get((req, res)=>{
    res.render("pages/about")
})
router.route("/pricing").get((req, res)=>{
    res.render("pages/pricing")
})
router.route("/faq").get((req, res)=>{
    res.render("pages/faq")
})
router.route("/register").get((req, res)=>{
    res.render("pages/register")
})

module.exports = router