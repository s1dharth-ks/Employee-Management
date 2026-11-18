import bycrpt from "bcrypt";
import employee from "../models/user.js";
import jwt from "jsonwebtoken"

export const register = async(req,res)=>{
    try{
        const {name,email,password,age,phone} = req.body
        if(!email){
            console.log("email is required");           
        }
        const existingEmail = await employee.findOne({email})
        if(existingEmail){
            console.log("Email is already existing...");
        }else{
            const saltRound = 10
            const salt = bycrpt.genSaltSync(saltRound)
            console.log(salt);
            const hash = bycrpt.hashSync(password,salt)
            const newEmployee = new employee({name,email,password:hash,age,phone})
            const savedEmployees = await newEmployee.save()
            res.status(200).json({
                status:true,
                message:"register succesfully",
                data: savedEmployees 
            })
    }
       
    }catch(err){
        console.log(err);
    }
}

export const getEmployees = async(req,res)=>{
    try{
        const employees = await employee.find()

        res.status(200).json({
            status : true,
            message : "successfull",
            data : employees
        })
    }catch(err){
        console.log(err);
       
    }
}

export const login = async(req,res)=>{
    try{
        const {email,password} = req.body
        if(!email || !password){
            console.log("Emali and Password is required...!");
        }

        const Employee = await employee.find({email})
        
        if(!Employee){
            console.log("Employee is not found"); 
        }
        const ispassword = await bycrpt.compare(password,Employee.password)
        if(!ispassword){
            console.log("invalid password");
        }else{
            const token = jwt.sign({
                employeeId:Employee._id,
                employeeEmail:Employee.email
            },process.env.secret,
            {expiresIn: "30d"}
        )
        res.status(200),json({
            status:true,
            message:"successfull",
            data: Employee,
            acsess_token:token
        })
        }
    }catch(err){
        console.log(err) 
    }
}