import { FileText } from "lucide-react"
import { Button } from "../ui/button"
import { Link } from "react-router"


function EmptyState({ message }) {
    return (
        <div className="text-center py-20">
            <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold">{message}</h3>
            <p className="mt-2 text-sm text-muted-foreground">
                There are no posts to display. Why not create the first one?
            </p>
            <Button asChild className="mt-6">
                <Link to="/create-post">Create Post</Link>
            </Button>
        </div>
    )
}

export default EmptyState