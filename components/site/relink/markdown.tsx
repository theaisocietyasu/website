import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

/** Banner markdown in the site's type styles. Raw HTML is not rendered. */
export function RelinkMarkdown({ children, className = "" }: { children: string; className?: string }) {
  return (
    <div className={`md ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ node: _node, ...props }) => <a {...props} target="_blank" rel="noopener noreferrer" />,
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  )
}
