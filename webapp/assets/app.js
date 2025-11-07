const CONTENT_SELECTOR = '#content';
const TOC_SELECTOR = '#toc-list';
const TOC_SEARCH_SELECTOR = '#toc-search';
const SELECTOR_ID = '#document-selector';
const DOWNLOAD_LINK_ID = '#download-link';

const DOCUMENTS = [
  {
    id: 'field-guide',
    label: 'Repository field guide',
    path: '../docs/repository-field-guide.md',
    downloadLabel: 'Download Field Guide Markdown'
  },
  {
    id: 'howto',
    label: 'Implementation playbook',
    path: '../docs/digital-product-team-howto.md',
    downloadLabel: 'Download Playbook Markdown'
  },
  {
    id: 'whatsup',
    label: 'WhatsUp Logistics case study',
    path: '../docs/case-studies/whatsup-logistics.md',
    downloadLabel: 'Download Case Study Markdown'
  },
  {
    id: 'mcp-guide',
    label: 'MCP integration guide',
    path: '../docs/mcp-integration-guide.md',
    downloadLabel: 'Download MCP Guide Markdown'
  }
];

const DOCUMENT_LOOKUP = DOCUMENTS.reduce((acc, doc) => {
  acc[doc.id] = doc;
  return acc;
}, {});

const contentEl = document.querySelector(CONTENT_SELECTOR);
const tocEl = document.querySelector(TOC_SELECTOR);
const tocSearch = document.querySelector(TOC_SEARCH_SELECTOR);
const docSelector = document.querySelector(SELECTOR_ID);
const downloadLink = document.querySelector(DOWNLOAD_LINK_ID);
let currentDoc = DOCUMENT_LOOKUP[docSelector?.value || DOCUMENTS[0].id];

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function buildToc() {
  const headings = contentEl.querySelectorAll('h2, h3, h4');
  const tocItems = Array.from(headings).map((heading) => {
    if (!heading.id) {
      heading.id = slugify(heading.textContent);
    }

    const level = parseInt(heading.tagName.substring(1), 10);
    const link = document.createElement('a');
    link.href = `#${heading.id}`;
    link.textContent = heading.textContent;
    link.dataset.level = level;
    link.setAttribute('role', 'link');

    return link;
  });

  tocEl.innerHTML = '';
  tocItems.forEach((item) => {
    item.style.paddingLeft = `${(parseInt(item.dataset.level, 10) - 2) * 12}px`;
    tocEl.appendChild(item);
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const link = tocEl.querySelector(`a[href="#${entry.target.id}"]`);
        if (link) {
          if (entry.isIntersecting) {
            tocEl.querySelectorAll('a').forEach((l) => l.classList.remove('active'));
            link.classList.add('active');
          }
        }
      });
    },
    {
      rootMargin: '-60px 0px -60% 0px',
      threshold: [0, 0.2, 0.4, 0.6, 0.8, 1]
    }
  );

  headings.forEach((heading) => observer.observe(heading));

  tocSearch?.addEventListener('input', (event) => {
    const query = event.target.value.toLowerCase();
    tocItems.forEach((item) => {
      const matches = item.textContent.toLowerCase().includes(query);
      item.style.display = matches ? 'block' : 'none';
    });
  });
}

function updateDownloadLink(doc) {
  if (!downloadLink) return;
  downloadLink.href = doc.path;
  downloadLink.textContent = doc.downloadLabel;
}

async function loadDocument(docId) {
  const nextDoc = DOCUMENT_LOOKUP[docId] || DOCUMENT_LOOKUP[DOCUMENTS[0].id];
  currentDoc = nextDoc;
  updateDownloadLink(currentDoc);
  try {
    const response = await fetch(nextDoc.path);
    if (!response.ok) {
      throw new Error(`Failed to load document: ${response.statusText}`);
    }
    const markdown = await response.text();
    const html = marked.parse(markdown, { mangle: false, headerIds: false });
    contentEl.innerHTML = html;
    buildToc();
    if (tocSearch) {
      tocSearch.value = '';
    }
  } catch (error) {
    contentEl.innerHTML = `
      <div class="error">
        <h2>Unable to load guide</h2>
        <p>${error.message}</p>
        <p>Make sure you are serving the repository over HTTP (for example, <code>python -m http.server</code>) so the document can be fetched.</p>
      </div>
    `;
    console.error(error);
  }
}

updateDownloadLink(currentDoc);
loadDocument(currentDoc.id);

docSelector?.addEventListener('change', (event) => {
  const nextId = event.target.value;
  loadDocument(nextId);
});
