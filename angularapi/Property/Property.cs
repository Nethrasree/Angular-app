public static class Property
{
    public const string addedMessage = "Details added Successfully ";
    public const string updatedMessage = "All details are updated Successfully ";
    public const string deletedMessage = "Removed all details Successfully ";
    public const string identityImage = "anonymous.png";
    public const string feedbackAddMessage = "Feedback stored Successfully ";
    public const string feedbackDeleteMessage = "Feedback removed Successfully ";

    public const string getquery = @"
                                select personId, name,
                                dateOfBirth, email,gender,address,mobileNo,identityProof from
                                dbo.personaldetails";

    public const string insertquery =@"
                         insert into 
                         dbo.personaldetails(name,dateOfBirth, email,gender,address,mobileNo,identityProof)
                          values(@name,@dateOfBirth, @email,@gender,@address,@mobileNo,@identityProof)";
    public const string updatequery = @" update dbo.personaldetails set name=@name,dateOfBirth = @dateOfBirth,
                          email = @email,gender = @gender,address =  @address,mobileNo = @mobileNo,
                          identityProof = @identityProof where personId = @personId";
    public const string deletequery = @"delete dbo.personaldetails where personId = @personId";                     

}