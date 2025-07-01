import { useEffect } from "react"
import { useSearchParams } from "react-router"
import { Link } from "react-router"
import { motion } from "framer-motion"
import { Button } from "../../components/ui/button"
import { useConfirmVerification } from "../../hooks/useAuth"
import { CircleCheck, CircleX, Loader2 } from "lucide-react"

function VerifyEmail() {
  const [searchParams] = useSearchParams()
  const { mutate: confirmVerification, isPending, isSuccess, isError, error } = useConfirmVerification()

  useEffect(() => {
    const userId = searchParams.get("userId")
    const secret = searchParams.get("secret")

    if (userId && secret) {
      confirmVerification({ userId, secret })
    }
  }, [searchParams, confirmVerification])

  let content

  if (isPending) {
    content = (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center space-y-4"
      >
        <Loader2 className="h-16 w-16 animate-spin text-primary mx-auto" />
        <h2 className="text-2xl font-bold">Verifying your email...</h2>
        <p className="text-muted-foreground">Please wait while we verify your account.</p>
      </motion.div>
    )
  } else if (isSuccess) {
    content = (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center space-y-4"
      >
        <CircleCheck className="h-16 w-16 text-green-500 mx-auto" />
        <h2 className="text-2xl font-bold text-green-600">Email verified!</h2>
        <p className="text-muted-foreground">Your account has been successfully verified. You can now sign in.</p>
        <Link to="/login">
          <Button size="lg" className="mt-6">
            Continue to Sign In
          </Button>
        </Link>
      </motion.div>
    )
  } else if (isError) {
    content = (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center space-y-4"
      >
        <CircleX className="h-16 w-16 text-destructive mx-auto" />
        <h2 className="text-2xl font-bold text-destructive">Verification failed</h2>
        <p className="text-muted-foreground">{error?.message || "The verification link is invalid or has expired."}</p>
        <Link to="/login">
          <Button variant="outline" size="lg" className="mt-6 bg-transparent">
            Back to Sign In
          </Button>
        </Link>
      </motion.div>
    )
  } else {
    content = (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center space-y-4"
      >
        <CircleX className="h-16 w-16 text-destructive mx-auto" />
        <h2 className="text-2xl font-bold text-destructive">Invalid verification link</h2>
        <p className="text-muted-foreground">The verification link is missing required information.</p>
        <Link to="/login">
          <Button variant="outline" size="lg" className="mt-6 bg-transparent">
            Back to Sign In
          </Button>
        </Link>
      </motion.div>
    )
  }

  return <div className="py-8">{content}</div>
}

export default VerifyEmail
