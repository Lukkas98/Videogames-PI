
const regexNum = /^(?:0(?:\.[0-9]{1,2})?|5(?:\.0{1,2})?|[1-4](?:\.[0-9]{1,2})?)$/;
const regexDate = /^\d{4}-\d{2}-\d{2}$/;
const regexImage = /(http(s?):)([/|.|\w|\s|-])*.(?:jpg|gif|png)/;

export default function validate(inputs){
    let errors = {};
    if (!inputs.name) errors.name = "A name is required";
    if (inputs.name.length > 50) errors.name =  "The name is too long";

    if(!inputs.description) errors.description = "A game description is required";
    if(inputs.description.length > 200) errors.description = "The description is very long. should not be longer than 200 characters";
    
    if(!regexDate.test(inputs.releaseDate)) errors.releaseDate = "the format must be YYYY-MM-DD";
    if(!inputs.releaseDate) errors.releaseDate = "A Date is required";

    if(!regexNum.test(inputs.rating)) errors.rating = "The value must be between 0.00 and 5.00";
    if(!inputs.rating) errors.rating = "A rating is required";

    if (!regexImage.test(inputs.image)) errors.image = "URL must be an image (.jpg, .png or .gif)";
    if(inputs.image.length > 200) errors.image = "URL is too long";

    return errors;
}

