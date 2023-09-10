import { useNavigation } from "react-router-dom"


const SubmitBtn = ({text}) => {
    const naviagtion = useNavigation();
    const isSubmitting = naviagtion.state === 'submitting';
  return (
    <button className="btn btn-primary btn-block" disabled={isSubmitting}>{
        isSubmitting ? <>
            <span className="loading loading-spinner"></span>
            sending...
        </>: text || 'submit'
    }</button>
  )
}
export default SubmitBtn