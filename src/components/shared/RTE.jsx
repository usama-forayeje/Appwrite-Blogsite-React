import { useRef } from "react"
import { Editor } from "@tinymce/tinymce-react"
import { Label } from "../ui/label"
import { useTheme } from "../providers/ThemeProvider"
import config from "../../config/config"

function RTE({ label, value, onChange, error }) {
  const editorRef = useRef(null)
  const { theme } = useTheme()

  const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)

  return (
    <div className="w-full">
      {label && (
        <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block">
          {label}
        </Label>
      )}

      <div className={`border rounded-md ${error ? "border-destructive" : "border-input"}`}>
        <Editor
          apiKey={config.tinyMCEApiKey}
          onInit={(evt, editor) => (editorRef.current = editor)}
          value={value}
          onEditorChange={onChange}
          init={{
            height: 500,
            menubar: true,
            plugins: [
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "charmap",
              "preview",
              "anchor",
              "searchreplace",
              "visualblocks",
              "code",
              "fullscreen",
              "insertdatetime",
              "media",
              "table",
              "paste",
              "code",
              "help",
              "wordcount",
              "codesample",
              "emoticons",
              "directionality",
              "nonbreaking",
            ],
            toolbar:
              "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | " +
              "forecolor backcolor | alignleft aligncenter alignright alignjustify | " +
              "bullist numlist outdent indent | removeformat | " +
              "link image media table codesample emoticons | " +
              "preview code fullscreen help",
            skin: isDark ? "oxide-dark" : "oxide",
            content_css: isDark ? "dark" : "default",
            content_style: `
              body { 
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
                font-size: 16px; 
                line-height: 1.6;
                color: ${isDark ? "#e2e8f0" : "#1e293b"};
                background-color: ${isDark ? "#0f172a" : "#ffffff"};
                padding: 16px;
              }
              h1, h2, h3, h4, h5, h6 { 
                color: ${isDark ? "#f1f5f9" : "#0f172a"};
                margin-top: 1.5em;
                margin-bottom: 0.5em;
              }
              p { margin-bottom: 1em; }
              a { color: #3b82f6; text-decoration: underline; }
              blockquote { 
                border-left: 4px solid #3b82f6; 
                padding-left: 16px; 
                margin: 16px 0;
                font-style: italic;
                color: ${isDark ? "#94a3b8" : "#64748b"};
              }
              code { 
                background-color: ${isDark ? "#1e293b" : "#f1f5f9"};
                padding: 2px 4px;
                border-radius: 4px;
                font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
              }
              pre { 
                background-color: ${isDark ? "#1e293b" : "#f8fafc"};
                padding: 16px;
                border-radius: 8px;
                overflow-x: auto;
              }
            `,
            branding: false,
            promotion: false,
            resize: false,
            statusbar: false,
            elementpath: false,
            setup: (editor) => {
              editor.on("init", () => {
                // Custom initialization if needed
              })
            },
          }}
        />
      </div>

      {error && <p className="text-sm text-destructive mt-1">{error}</p>}
    </div>
  )
}

export default RTE
