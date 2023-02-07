
interface Props{
    status:boolean;
    contentEnable:string;
    contentDisaple:string;
    onChangeStatus:() => void
}
const StatusElement = ({onChangeStatus,status,contentEnable,contentDisaple}:Props) =>{
    const renderElement = () =>{
        if(status){
            return <span onClick={onChangeStatus}>{contentEnable}</span>
        }
        else{
            return <span onClick={onChangeStatus}>{contentDisaple}</span>
        }
    }
    return(
        <>
            {renderElement()}
        </>
        
    )
}
export default StatusElement;