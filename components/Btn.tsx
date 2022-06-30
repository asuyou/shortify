import { forwardRef } from "react"

const Btn = forwardRef((props: any, ref) => (
  <button
  {...props}
  ref={ref}
  className={'focus:outline-none rounded-md border hover:text-white px-5 py-2 mx-5 '+props.className}></button>
))

export default Btn
