
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
    if(!inputs.releaseDate) {
        errors.releaseDate = "A Date is required";
    }else{
        const date = new Date();
        const year = date.getFullYear();
        const month = (date.getMonth() + 1);
        const day = date.getDate();

        const inputDate = inputs.releaseDate.split("-");
        const inputYear = parseInt(inputDate[0]);
        const inputMonth = parseInt(inputDate[1]);
        const inputDay = parseInt(inputDate[2]);

        if (inputYear > year) errors.releaseDate = "The date cannot be greater than the current date";
        else if(inputYear === year && inputMonth > month ) errors.releaseDate = "The date cannot be greater than the current date";
        else if(inputYear === year && inputMonth === month && inputDay > day) errors.releaseDate = "The date cannot be greater than the current date";
    }

    if(!regexNum.test(inputs.rating)) errors.rating = "The value must be between 0.00 and 5.00";
    if(!inputs.rating) errors.rating = "A rating is required";

    if (!regexImage.test(inputs.image)) errors.image = "URL must be an image (.jpg, .png or .gif)";
    if(inputs.image.length > 200) errors.image = "URL is too long";

    if (!inputs.platforms.length) errors.platforms = "There must be at least 1 platform"

    if (!inputs.genres.length) errors.genres = "There must be at least 1 genre"

    return errors;
}

