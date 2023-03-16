import "./Error.modules.css"

export default function Error( {nameError} ){

    return(
        <div className="divError">
            {
                nameError ? 
                (
                    <>
                        <p>ERROR 404 NOT FOUND</p>
                        <p>There're no games with name {nameError}</p>
                    </>
                )
                : <p>ERROR 404 Games not Found</p>
            }
        </div>
    )
}