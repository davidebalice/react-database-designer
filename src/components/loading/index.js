import svg from "../../assets/img/loading.svg"

const Loading = () => {
    return (
        <>
            <div className="row d-flex justify-content-center my-5 mb-5">
                <img src={svg} alt="loading" style={{width:'200px'}}/>
            </div>
        </>
    )
}

export default Loading