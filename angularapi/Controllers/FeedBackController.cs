using Angularapi.Models;
using Microsoft.AspNetCore.Mvc;
using System.Text.RegularExpressions;
using System.Text;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authorization;
using System.Security.Cryptography;
using angularapi.Context;

namespace Angularapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FeedBackController : ControllerBase
    {
        private readonly AppDbContext appdbContext;
        public FeedBackController(AppDbContext context)
        {
            appdbContext = context;
        }

         [HttpPost]
       public async Task<IActionResult> AddFeedback([FromBody]FeedBack feedback)
       {
         feedback.feedbackId = new Guid();
        await  appdbContext.feedback.AddAsync(feedback);
         await appdbContext.SaveChangesAsync();
         
         return Ok(feedback);
       }

        [HttpGet]
       public async Task<IActionResult> GetFeedback()
       {
         var feedbacks = await appdbContext.feedback.ToListAsync();
         return Ok(feedbacks);
       }

  

       [HttpDelete]
       [Route("{feedbackId:guid}")]
       public async Task<IActionResult> DeleteFeedback([FromRoute] Guid feedbackId)
       {
           var feedback = await  appdbContext.feedback.FirstOrDefaultAsync(value=>value.feedbackId==feedbackId);
           if(feedback!=null)
            {
                  appdbContext.feedback.Remove(feedback);
                await appdbContext.SaveChangesAsync();
                
                return Ok(feedback);
            }
            else
            { 
                return NotFound ("Feedback not found");
            }
       }


    }
}