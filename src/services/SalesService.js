
//import mongoose model for sales
const SalesModel = require("../models/SalesModel")

//total-revenue Service
const TotalRevenueService = async(req,res) =>{
   try {
       let matchStage = {$match:{}};
       let multiplyQuantityPrice = { $multiply:["$quantity","$price"]};
       let totalRevenue = {$sum:multiplyQuantityPrice};
       let groupByStage = {
           $group:{"_id": null , totalRevenue:totalRevenue}
       }
       let data = await  SalesModel.aggregate([matchStage,groupByStage]);
       return {status:"success" , data:data}
   }catch (e) {
       return {status:"failed" , data:e}.toString()
   }
}

//quantity-by-product Service
const QuantityByProductService = async(req,res) =>{
   try {
       let matchStage = {$match:{}};
       let totalQuantitySold = {$sum:"$quantity"};
       let groupByStage = {
           $group:{"_id": "$product" , totalQuantitySold }
       }
       let sortStage ={$sort:{totalQuantitySold:-1}}
       let data = await  SalesModel.aggregate([matchStage,groupByStage,sortStage]);
       return {status:"success" , data:data}
   }catch (e) {
       return {status:"failed" , data:e}.toString()
   }
}

//top-products Service
const TopProductsService = async(req,res) =>{
     try {
         let matchStage = {$match:{}};
         let multiplyQuantityPrice = { $multiply:["$quantity","$price"]};
         let totalRevenue = {$sum:multiplyQuantityPrice};
         let groupByStage = {
             $group:{"_id":"$product"  , totalRevenue }
         }
         let sortByRevenueStage = {$sort:{totalRevenue:-1}};
         let limitStage = {$limit:5}
         let data = await SalesModel.aggregate([
             matchStage, groupByStage,sortByRevenueStage,limitStage
         ]);
         return {status:"success" , data:data}
     }catch (e) {
         return {status:"failed" , data:e}.toString()
     }
}

//average-price Service
const AveragePriceService = async(req,res) =>{
    try {
        let matchStage = {$match:{}};
        let groupStageByProduct ={
            $group: {
                _id: "",
                avgPrice: { $avg: "$price"}
            }
        }

        let data = await  SalesModel.aggregate([
            matchStage,groupStageByProduct
        ]);
        return {status:"success" , data:data}
    }catch (e) {
        return {status:"failed" , data:e}.toString()
    }
}

//revenue-by-month Service
const RevenueByMonthService = async(req,res) =>{
  try{
      let matchStage ={$match:{}};
      let year ={$year:"$date"};
      let month ={$month:"$date"};
      let totalRevenue = { $sum: { $multiply: ["$quantity", "$price"] } };
      let groupStage = {$group:{
          "_id":{year,month}, totalRevenue:totalRevenue
          }};
      let data = await  SalesModel.aggregate([
          matchStage,groupStage
      ]);
      return {status:"success" , data:data}
  }catch (e) {
      return {status:"failed" , data:e}.toString()
  }
}

//highest-quantity-sold Service
const HighestQuantitySoldService = async(req,res) =>{
  try{
      let matchStage = {$match:{}};
      let groupStage ={$group:{
          "_id":{ date:"$date" , product:"$product" },
              maxSoldQuantityInADay:{$sum:"$quantity"}
          }};
      let sortStage = {$sort:{maxSoldQuantityInADay:-1}}
      let limitStage = {$limit:1}
      let data = await SalesModel.aggregate([matchStage,groupStage,sortStage,limitStage]);
      return {status:"success" , data:data}
  }catch (e) {
      return {status:"failed" , data:e}.toString()
  }
}

//department-salary-expense Service
const DepartmentSalaryExpenseService = async(req,res) =>{
    try{
        let matchStage = {$match:{}}
        let totalSalary = {$sum:"$salary"}
        let groupStage = {$group:{
            "_id":"$department", totalSalary:totalSalary
            }}
        let data = await SalesModel.aggregate([matchStage,groupStage]);
        return {status:"success" , data:data}
    }catch (e) {
        return {status:"failed" , data:e}.toString()
    }
}


module.exports = {TotalRevenueService,QuantityByProductService,TopProductsService,AveragePriceService,
RevenueByMonthService,HighestQuantitySoldService,DepartmentSalaryExpenseService
}