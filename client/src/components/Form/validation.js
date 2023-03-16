
const regexNum = /^[0-9]+([.][0-9]+)?$/;
const regexDate = /^\d{4}-\d{2}-\d{2}$/;
const regexImage = /(http(s?):)([/|.|\w|\s|-])*.(?:jpg|gif|png)/;

export default function validate(inputs){
    let errors = {};
    if (!inputs.name) errors.name = "A name is required";
    if (inputs.name.length > 35) errors.name =  "Must not be more than 35 characters";

    if(!inputs.description) errors.description = "A game description is required";
    if(inputs.description.length > 300) errors.description = "The description is very long. should not be longer than 300 characters";
    
    if(!inputs.releaseDate) errors.releaseDate = "A Date is required";
    if(!regexDate.test(inputs.releaseDate)) errors.releaseDate = "the format must be YYYY-MM-DD";

    if(!inputs.rating) errors.rating = "A rating is required";
    if(!regexNum.test(inputs.rating)) errors.rating = "the format must be 0.00";

    if (!inputs.image) errors.image = "a path is needed for the image";
    if (!regexImage.test(inputs.image)) errors.image = "URL must be an image (.jpg, .png or .gif)"
    if(inputs.image.length > 200) errors.image = "URL is too long"

    return errors;
}

