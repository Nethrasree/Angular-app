using System.ComponentModel.DataAnnotations;
namespace Angularapi.Models
{
    public class personaldetails
     {
        [Key]
        public int personId { get;set;}
        public string? name { get;set;}
        public string? dateOfBirth { get;set;}
        public string? email{get;set;}
        public string? gender { get;set;}
        public string? address { get;set;}
        public string? mobileNo { get;set;}
        public string? identityProof { get;set;}
     }
    
     public class PaymentDetail
     {
      [Key]
        public int PaymentDetailsId { get;set;}
        
        public string? CardOwnerName { get;set;}
        
        public string? CardNumber { get;set;}
       
        public string? ExpirationDate { get;set;}
        
        public string? SecurityCode{get;set;}
        
     }
     public class FeedBack
     {
      [Key]
        public Guid feedbackId { get;set;}
        
        public string? Name { get;set;}
        
        public string? Email { get;set;}

        public string? MobileNo { get;set;}
       
        public string? Message { get;set;}
        
     }

      public class FeedBackResponse
      {
         public FeedBack Data { get; set; }
         public string Message { get; set; }
      }

     
     
}