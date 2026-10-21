import { useEffect } from 'react';

// A small custom hook: each page can set the browser-tab title.
export default function useDocumentTitle(title) {
  useEffect(() => {
    document.title = `${title} | Frame`;
  }, [title]);
}
