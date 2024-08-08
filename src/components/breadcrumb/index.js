import {Link} from 'react-router-dom'

const breadcrumb = ({title,brad}) => {

    return (
        <>
            <div className="row d-flex justify-content-between breadcrumb_main my-2 mb-4">
                <div className="col d-flex align-items-center" style={{ whiteSpace: 'nowrap' }}>
                    <span className="text-xl" style={{ fontSize: '150%' }}>{title} </span>
                </div>
                <div className="col d-flex justify-content-end" style={{whiteSpace: 'nowrap', position: 'inherit' }}>
                    <nav aria-label="breadcrumb" style={{display: "ruby"}}>
                        <ol className="breadcrumb">
                            {
                                brad.map((data,i)=>{
                                   
                                 return  <li key={i} className="breadcrumb-item"><Link to={data.name === "home" && "/"}>{data.name}</Link></li>
                                })
                            }
                            
                        </ol>
                    </nav>
                </div>
            </div>
        </>
    )
}

export default breadcrumb
