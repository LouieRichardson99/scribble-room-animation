import { useState } from "react"
import { useForm } from "react-hook-form"
import { Input } from "../Input"
import styles from "./styles.module.scss"
import { PaperAirplaneIcon } from "@heroicons/react/24/outline"

export const JobApplicationForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { register, handleSubmit } = useForm()

  const encode = (data) => {
    return Object.keys(data)
      .map(
        (key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
      )
      .join("&")
  }

  const handleFormSubmission = async (data) => {
    console.log(data.cv[0])

    fetch(`/`, {
      method: "POST",
      body: encode({
        "form-name": "job-application",
        cv: data?.cv[0],
        ...data,
      }),
    }).catch((error) => console.log(error))
  }

  const onSubmit = async (data) => {
    await handleFormSubmission(data)

    setIsSubmitted(true)
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={styles.form}
      name="job-application"
      data-netlify="true"
      id="job-application"
      encType="multipart/form-data"
    >
      <input type="hidden" name="form-name" value="job-application" />
      <div className={styles.flex_container}>
        <Input
          name="full_name"
          label="Full Name"
          type="text"
          autoComplete="name"
          required
          register={register}
        />
        <Input
          name="email"
          label="Email"
          type="email"
          autoComplete="email"
          required
          register={register}
        />
      </div>
      <div className={styles.flex_container}>
        <Input
          name="cv"
          label="Upload Your CV"
          type="file"
          required
          register={register}
        />
        <Input
          name="linkedin_url"
          label="LinkedIn Profile URL"
          type="text"
          register={register}
        />
      </div>
      <button className={`button primary ${styles.button}`}>
        Submit
        <PaperAirplaneIcon />
      </button>
      {/* {isSubmitted ? (
        <p className={styles.submit_success_text}>
          Thank you for submitting an job application form!
          <br />
          We will get back to you shortly.
        </p>
      ) : (
        <div className={styles.button_container}>
          <button className={`button primary ${styles.button}`}>
            Submit
            <PaperAirplaneIcon />
          </button>
        </div>
      )} */}
    </form>
  )
}
