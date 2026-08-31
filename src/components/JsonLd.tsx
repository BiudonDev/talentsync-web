/**
 * The officially documented App Router pattern for structured data: a native
 * `<script>` rendered inside a server component, not `next/script` and not a
 * metadata field. Server component, so the JSON lands in the prerendered HTML
 * for crawlers that never execute JS.
 */
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // `<` escaped so a stray tag inside copy cannot break out of the script block.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  )
}
