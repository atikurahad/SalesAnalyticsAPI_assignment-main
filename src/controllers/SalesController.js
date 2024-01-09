//import all the services
const {TotalRevenueService,QuantityByProductService,TopProductsService,AveragePriceService,
    RevenueByMonthService,HighestQuantitySoldService,DepartmentSalaryExpenseService } = require("../services/SalesService")

//import mongoose model for sales
const SalesModel = require("../models/SalesModel")

exports.CreateSales = async(req,res)=>{
    let reqBody = req.body ;
    let data = await SalesModel.create(reqBody);
    res.status(201).json({status:"success",data:data})
}

//total-revenue controller
exports.TotalRevenue = async(req,res) =>{
    let result = await TotalRevenueService();
    if(result['status'] === "success"){
        res.status(200).json(result)
    }else{
        res.status(400).json(result)
    }
}

//quantity-by-product controller
exports.QuantityByProduct = async(req,res) =>{
    let result = await QuantityByProductService();
    if(result['status'] === "success"){
        res.status(200).json(result)
    }else{
        res.status(400).json(result)
    }
}

//top-products controller
exports.TopProducts = async(req,res) =>{
    let result = await TopProductsService();
    if(result['status'] === "success"){
        res.status(200).json(result)
    }else{
        res.status(400).json(result)
    }
}

//average-price controller
exports.AveragePrice = async(req,res) =>{
    let result = await AveragePriceService();
    if(result['status'] === "success"){
        res.status(200).json(result)
    }else{
        res.status(400).json(result)
    }
}

//revenue-by-month controller
exports.RevenueByMonth = async(req,res) =>{
    let result = await RevenueByMonthService();
    if(result['status'] === "success"){
        res.status(200).json(result)
    }else{
        res.status(400).json(result)
    }
}

//highest-quantity-sold controller
exports.HighestQuantitySold = async(req,res) =>{
    let result = await HighestQuantitySoldService();
    if(result['status'] === "success"){
        res.status(200).json(result)
    }else{
        res.status(400).json(result)
    }
}

//department-salary-expense controller
exports.DepartmentSalaryExpense = async(req,res) =>{
    let result = await DepartmentSalaryExpenseService();
    if(result['status'] === "success"){
        res.status(200).json(result)
    }else{
        res.status(400).json(result)
    }
}