using Microsoft.AspNetCore.Mvc;
using System.Data.SqlTypes;
using Microsoft.Extensions.Configuration;
using Microsoft.Data.SqlClient;
using System.Data;
using Angularapi.Models;

namespace Angularapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonalDetailController : ControllerBase
    {

            private readonly IConfiguration _configuration;//to read connection string
             private readonly IWebHostEnvironment _environment;//hosting environment - application running

                public PersonalDetailController(IConfiguration configuration,IWebHostEnvironment environment)
                {
                    _configuration = configuration;
                    _environment = environment;
                }
                [HttpGet]
                    public JsonResult Get()  //JsonResult- to return JSON data to be used by client-side javascripts
                    {

                    string query = Property.getquery;
                    DataTable table = new DataTable(); 
                    string sqlDataSource = _configuration.GetConnectionString("Default"); 
                    SqlDataReader myReader;
                    using (SqlConnection myConnection = new SqlConnection(sqlDataSource))
                    {
                        myConnection.Open();
                    using (SqlCommand myCommand = new SqlCommand(query, myConnection))
                {
                    myReader = myCommand.ExecuteReader(); 
                    table.Load(myReader);
                    myReader.Close();
                    myConnection.Close();
                    }
            }
            return new JsonResult(table);
            }

         [HttpPost]
        public JsonResult Post(personaldetails personaldetail)
            {

            string query = Property.insertquery ;
                         
             DataTable table = new DataTable(); 
            string sqlDataSource = _configuration.GetConnectionString("Default"); 
            SqlDataReader myReader;
             using (SqlConnection myConnection = new SqlConnection(sqlDataSource))
             {
                 myConnection.Open();
            using (SqlCommand myCommand = new SqlCommand(query, myConnection))
           {
              myCommand.Parameters.AddWithValue("@name",personaldetail.name);
              myCommand.Parameters.AddWithValue("@dateOfBirth",personaldetail.dateOfBirth);
              myCommand.Parameters.AddWithValue("@email",personaldetail.email);
              myCommand.Parameters.AddWithValue("@gender",personaldetail.gender);
              myCommand.Parameters.AddWithValue("@address",personaldetail.address);
              myCommand.Parameters.AddWithValue("@mobileNo",personaldetail.mobileNo);
              myCommand.Parameters.AddWithValue("@identityProof",personaldetail.identityProof);

            myReader = myCommand.ExecuteReader(); 
             table.Load(myReader);
            myReader.Close();
             myConnection.Close();
            }
    }
    return new JsonResult(Property.addedMessage);
    }
   

     [HttpPut]
        public JsonResult Put(personaldetails personaldetail)
            {

            string query = Property.updatequery;
                         
             DataTable table = new DataTable(); 
            string sqlDataSource = _configuration.GetConnectionString("Default"); 
            SqlDataReader myReader;
             using (SqlConnection myConnection = new SqlConnection(sqlDataSource))
             {
                 myConnection.Open();
            using (SqlCommand myCommand = new SqlCommand(query, myConnection))
           {
              myCommand.Parameters.AddWithValue("@personId",personaldetail.personId);
              myCommand.Parameters.AddWithValue("@name",personaldetail.name);
              myCommand.Parameters.AddWithValue("@dateOfBirth",personaldetail.dateOfBirth);
              myCommand.Parameters.AddWithValue("@email",personaldetail.email);
              myCommand.Parameters.AddWithValue("@gender",personaldetail.gender);
              myCommand.Parameters.AddWithValue("@address",personaldetail.address);
              myCommand.Parameters.AddWithValue("@mobileNo",personaldetail.mobileNo);
              myCommand.Parameters.AddWithValue("@identityProof",personaldetail.identityProof);

            myReader = myCommand.ExecuteReader(); 
             table.Load(myReader);
            myReader.Close();
             myConnection.Close();
            }
    }
    return new JsonResult(Property.updatedMessage);
    }

    
     [HttpDelete("{personId}")]
        public JsonResult Delete(int personId)
            {

            string query = Property.deletequery;
                         
             DataTable table = new DataTable(); 
            string sqlDataSource = _configuration.GetConnectionString("Default"); 
            SqlDataReader myReader;
             using (SqlConnection myConnection = new SqlConnection(sqlDataSource))
             {
                 myConnection.Open();
            using (SqlCommand myCommand = new SqlCommand(query, myConnection))
           {
              myCommand.Parameters.AddWithValue("@personId",personId);

            myReader = myCommand.ExecuteReader(); 
             table.Load(myReader);
            myReader.Close();
             myConnection.Close();
            }
    }
    return new JsonResult(Property.deletedMessage);
    }

    [Route("SaveFile")]
    [HttpPost]
    public JsonResult SaveFile()
    {
        try
        {
            var httpRequest = Request.Form;
            var postedFile = httpRequest.Files[0];  
            string filename = postedFile.FileName;
            var physicalPath = _environment.ContentRootPath + "/Photos/" + filename;

            using(var stream=new FileStream(physicalPath,FileMode.Create))
            {
                postedFile.CopyTo(stream);
            }
            return new JsonResult(filename);
        }
        catch(Exception)
        {
            return new JsonResult(Property.identityImage);
        }
    }
  }
  
  }


