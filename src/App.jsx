import React from "react";

const zones = [
  {
    id: "raw",
    label: "Zone 1",
    folder: "raw/",
    copy: "Your original sources. Claude can read them, but must not edit them.",
    owner: "Owner: You",
  },
  {
    id: "wiki",
    label: "Zone 2",
    folder: "wiki/",
    copy: "Clean concept pages, people pages, summaries, indexes, and links.",
    owner: "Owner: Claude",
  },
  {
    id: "dev",
    label: "Zone 3",
    folder: "dev/",
    copy: "Developer knowledge: ADRs, debriefs, snippets, project notes.",
    owner: "Owner: You + Claude",
  },
];

const rules = [
  {
    title: "raw/ is the evidence folder",
    copy: (
      <>
        Think of <code>raw/</code> as the original receipt. Even if a saved
        source is ugly or has extra junk, it stays untouched so you always know
        what Claude based its summary on.
      </>
    ),
  },
  {
    title: "wiki/ is the AI-maintained knowledge layer",
    copy: "Claude can create and update concept notes here. You avoid manual edits because changing one wiki page by hand can accidentally break links or summaries that depend on it.",
  },
  {
    title: "dev/ is the collaboration area",
    copy: "This is where your software engineering memory lives. You write the important decisions, then Claude helps clean them up, connect them, and find related notes.",
  },
];

const permissionRows = [
  ["raw/", "Yes", "No", "It is the source evidence."],
  ["wiki/", "Yes", "Yes", "It is the generated knowledge layer."],
  ["dev/", "Yes", "Only with approval", "It contains your engineering decisions."],
];

const paths = [
  {
    number: "Path 1",
    badge: "Recommended",
    title: "Direct filesystem + Obsidian skills",
    copy: "Open a terminal in the vault, run Claude Code, and let it read/write Markdown files directly. Obsidian does not need to be open.",
    points: [
      "Fastest to understand and debug",
      "Works with plain files",
      "Best starting point for beginners",
    ],
    recommended: true,
  },
  {
    number: "Path 2",
    badge: "Advanced",
    title: "MCP + Obsidian Local REST API",
    copy: "Obsidian exposes a local API, and Claude talks to that API through an MCP server. This unlocks Obsidian-specific actions, but adds moving parts.",
    points: [
      "Can access app-only features",
      "Requires Obsidian to be open",
      "More setup and more things to debug",
    ],
  },
  {
    number: "Path 3",
    badge: "Prebuilt",
    title: "claude-obsidian plugin",
    copy: "A ready-made plugin gives you commands and setup flows quickly, but you inherit someone else's folder structure and workflow choices.",
    points: [
      "Fast one-command entry",
      "Less control over design",
      "Harder to customize deeply later",
    ],
  },
];

const starterSteps = [
  {
    title: "Create one vault",
    copy: "Use one Obsidian vault so your reading notes and developer decisions can link to each other.",
  },
  {
    title: "Separate responsibilities",
    copy: (
      <>
        Use <code>raw/</code>, <code>wiki/</code>, and <code>dev/</code> so
        Claude knows what it can safely change.
      </>
    ),
  },
  {
    title: "Put rules in CLAUDE.md",
    copy: "This file tells Claude how to behave whenever it works inside the vault.",
  },
  {
    title: "Start with direct files",
    copy: "Use Path 1 first because plain Markdown files are easier to inspect, backup, and repair.",
  },
];

const prerequisites = [
  "Obsidian installed on your computer",
  "Claude Code installed globally",
  "Git installed and configured with your name and email",
  "Node.js 18 or newer",
  "Basic comfort with opening a terminal and running commands",
];

const vaultCommands = `mkdir -p ~/vault
cd ~/vault
git init

mkdir -p raw/clippings raw/papers raw/books raw/ideas raw/daily
mkdir -p wiki/concepts wiki/entities wiki/syntheses wiki/questions
mkdir -p dev/adr dev/debriefs dev/projects dev/snippets dev/reading-tech
mkdir -p .claude/skills .claude/commands

printf "# Wiki Index\\n\\nGlobal index maintained by the agent.\\n" > wiki/index.md
printf "# Vault\\n" > README.md`;

const gitignoreContent = `# Obsidian workspace state
.obsidian/workspace.json
.obsidian/workspace-mobile.json
.obsidian/cache

# Logs and temporary files
*.log
.DS_Store

# Agent scratch space
/tmp/`;

const gitignoreCreateCommand = `cat > .gitignore << 'EOF'
${gitignoreContent}
EOF`;

const claudeMdCreateCommand = `cd ~/vault

cat > CLAUDE.md << 'EOF'
# CLAUDE.md - Personal LLM-Wiki vault

You are operating inside my Obsidian vault. This file defines how you should behave.

## Zones

raw/ is read-only source material.
- Never edit, rename, move, or delete files in raw/.
- Only read and cite these files.

wiki/ is maintained by the agent.
- Create and update concept, entity, synthesis, question, and index pages here.
- Every page must have frontmatter with title, type, tags, sources, created, and updated.
- Use Obsidian wikilinks like [[LLM Wiki Pattern]].

dev/ is collaborative.
- Help with ADRs, debriefs, project notes, snippets, and technical reading notes.
- Do not edit existing ADRs without explicit confirmation.
- Suggest links and improvements before changing important decision records.

## Link rules

- Always use Obsidian wikilinks for internal links.
- Do not use normal Markdown links for vault notes.
- Use Title Case for concept and entity names.

## Safety rules

- Never delete files without explicit confirmation.
- Never run git push.
- Never edit CLAUDE.md without asking first.
- If a change affects more than 5 files, show the plan before editing.
- If the correct zone is unclear, ask before writing.

## Ingestion workflow

When I ask for /wiki-ingest:
1. Save the original source in raw/clippings/.
2. Identify key concepts and entities.
3. Check whether related wiki pages already exist.
4. Present a plan before editing wiki/.
5. After approval, create or update wiki pages and index links.
6. Report every file created or changed.
EOF`;

const skillInstallCommands = `cd ~/vault/.claude
git clone --depth 1 https://github.com/kepano/obsidian-skills.git
mv obsidian-skills/* skills/
mv obsidian-skills/.* skills/ 2>/dev/null || true
rm -rf obsidian-skills

ls skills/`;

const obsidianSkills = [
  {
    name: "obsidian-markdown",
    use: "Teaches Claude Obsidian-native Markdown: wikilinks, callouts, embeds, and frontmatter.",
  },
  {
    name: "obsidian-bases",
    use: "Helps Claude create Obsidian database views for things like ADRs by status.",
  },
  {
    name: "json-canvas",
    use: "Helps Claude create Obsidian canvas files for visual maps and relationships.",
  },
  {
    name: "obsidian-cli",
    use: "Lets Claude understand terminal automation around Obsidian vaults.",
  },
  {
    name: "defuddle",
    use: "Cleans web pages before ingestion so Claude reads the useful content, not the ads and menus.",
  },
];

const claudeRules = [
  "raw/ is read-only. Claude can inspect sources but must not change them.",
  "wiki/ is Claude-maintained. It can create and update concept, entity, synthesis, and index pages.",
  "dev/ is collaborative. Claude suggests changes, but sensitive files like ADRs need your approval.",
  "All internal links should use Obsidian wikilinks like [[LLM Wiki Pattern]].",
  "Every generated page needs frontmatter, tags, sources, and at least one useful wikilink.",
  "Claude must ask before deleting files, editing CLAUDE.md, pushing Git changes, or changing more than five files.",
];

const customSkills = [
  {
    name: "adr-writing",
    folder: ".claude/skills/adr-writing/SKILL.md",
    purpose: "Defines how architecture decisions are named, numbered, written, linked, and superseded.",
    details: [
      "Files live in dev/adr/",
      "Names look like ADR-0007-use-pgvector-for-rag.md",
      "Accepted ADRs are treated as historical records, not casual notes",
    ],
  },
  {
    name: "debrief-writing",
    folder: ".claude/skills/debrief-writing/SKILL.md",
    purpose: "Defines how incident notes and retrospectives stay factual, blameless, and reusable.",
    details: [
      "Files live in dev/debriefs/",
      "Names start with the incident date",
      "The most important output is the general lesson you can reuse later",
    ],
  },
];

const slashCommands = [
  {
    name: "/wiki-ingest",
    purpose: "Bring one URL or file into the vault.",
    flow: [
      "Clean or read the source",
      "Save the untouched source in raw/clippings/",
      "Find key concepts and entities",
      "Show you a plan before editing wiki/",
      "After approval, create or update the wiki pages",
    ],
  },
  {
    name: "/wiki-query",
    purpose: "Answer a question using what is already in the vault.",
    flow: [
      "Search wiki/ first",
      "Read only the most relevant files",
      "Answer with wikilink citations",
      "Clearly say when the vault does not know enough",
    ],
  },
];

const slashCommandCreateCommands = `cd ~/vault
mkdir -p .claude/commands

cat > .claude/commands/wiki-ingest.md << 'EOF'
---
description: Ingest a URL or file into the vault
argument-hint: <URL or file path>
allowed-tools: Bash(cat:*), Bash(ls:*), Bash(grep:*), WebFetch
---

Ingest $ARGUMENTS into the vault.

Steps:
1. Decide whether the source is a URL or local file.
2. Save the original source into raw/clippings/.
3. Identify key concepts and entities.
4. Check wiki/concepts/ and wiki/entities/ for existing pages.
5. Present an ingestion plan before editing wiki/.
6. Wait for approval.
7. After approval, create or update wiki pages and report changed files.
EOF

cat > .claude/commands/wiki-query.md << 'EOF'
---
description: Search the vault and answer using existing notes
argument-hint: <question>
allowed-tools: Bash(grep:*), Bash(find:*), Bash(cat:*)
---

Answer $ARGUMENTS using the vault.

Steps:
1. Search wiki/ first.
2. If needed, expand to dev/ and raw/.
3. Read only the most relevant files.
4. Answer directly with wikilink citations.
5. If the vault does not contain enough information, say so.
EOF`;

const slashCommandUsage = [
  {
    name: "/wiki-ingest",
    when: "Use when you want to add a new source to the vault.",
    example: "/wiki-ingest https://example.com/some-useful-post",
  },
  {
    name: "/wiki-query",
    when: "Use when you want an answer from knowledge already saved in the vault.",
    example: "/wiki-query what do I know about pgvector?",
  },
];

const verificationChecks = [
  {
    prompt: "what skills are available in this vault?",
    expected: "Claude should list the Obsidian skills plus your custom ADR and debrief skills.",
  },
  {
    prompt: "what are the vault zones and the rules for each?",
    expected: "Claude should explain raw/, wiki/, and dev/ using the rules from CLAUDE.md.",
  },
  {
    prompt: "/wiki-ingest <test URL>",
    expected: "Claude should save a raw clipping, identify concepts, and ask before editing wiki/.",
  },
];

const ingestionSteps = [
  {
    title: "You give Claude a source",
    detail: "You run /wiki-ingest with a URL or file path. Claude starts by treating it as source material, not as a final note.",
  },
  {
    title: "Claude cleans and saves the raw source",
    detail: "The source gets saved in raw/clippings/ with metadata like title, author, source URL, capture date, and tags.",
  },
  {
    title: "Claude checks what already exists",
    detail: "It scans wiki/concepts/ and wiki/entities/ so it can avoid duplicates and reuse existing pages.",
  },
  {
    title: "Claude shows an ingestion plan",
    detail: "Before changing the wiki, it tells you what it wants to create, update, link, and add to the index.",
  },
  {
    title: "You approve or adjust",
    detail: "You can say yes, reject the plan, or add missing ideas. This is the human gate.",
  },
  {
    title: "Claude edits the wiki and reports",
    detail: "After approval, it creates and updates files, then reports exactly what changed.",
  },
];

const ingestionPlan = [
  {
    label: "New concepts",
    items: [
      "[[File Over App]]",
      "[[Local-First Software]]",
      "[[Files Over Apps Movement]]",
    ],
  },
  {
    label: "Existing concepts to update",
    items: ["[[LLM Wiki Pattern]]", "[[Markdown as Database]]"],
  },
  {
    label: "New entity",
    items: ["[[Utsav Mehrotra]]"],
  },
  {
    label: "Index update",
    items: ["Add [[File Over App]] under design principles"],
  },
];

const changedFiles = [
  ["Created", "wiki/concepts/File-Over-App.md"],
  ["Created", "wiki/concepts/Local-First-Software.md"],
  ["Created", "wiki/concepts/Files-Over-Apps-Movement.md"],
  ["Created", "wiki/entities/Steph-Ango.md"],
  ["Updated", "wiki/concepts/LLM-Wiki-Pattern.md"],
  ["Updated", "wiki/concepts/Markdown-as-Database.md"],
  ["Updated", "wiki/index.md"],
];

const graphNodes = [
  "File Over App",
  "LLM Wiki Pattern",
  "Andrej Karpathy",
  "Utsav Mehrotra",
  "Obsidian",
  "Local-First Software",
];

const adrFlow = [
  "You ask for a draft ADR",
  "Claude reads the ADR skill",
  "Claude searches related vault notes",
  "Claude drafts ADR-0008 as proposed",
  "You run benchmarks and ingest results",
  "Claude updates the proposed ADR",
  "You decide",
  "Claude marks the ADR accepted and links it back to wiki/",
];

const adrArtifacts = [
  ["Search hits", "RAG concept, vector database comparison, RAG survey, earlier LlamaIndex ADR"],
  ["Draft file", "dev/adr/ADR-0008-pgvector-vs-qdrant-for-thesis-rag.md"],
  ["Status", "proposed while evidence is incomplete, accepted only after the decision"],
  ["Cross-links", "raw benchmark notes, wiki RAG concept, prior ADRs, final decision"],
];

const dailySynthesis = [
  {
    label: "Recurring themes",
    text: "Repeated thoughts, frustrations, and project patterns that appeared across several days.",
  },
  {
    label: "Pending decisions",
    text: "Loose choices you wrote down but have not resolved yet.",
  },
  {
    label: "Concept candidates",
    text: "Ideas that might deserve future wiki pages, papers, or ingestions.",
  },
  {
    label: "Possible links",
    text: "Connections from daily notes to ADRs, debriefs, projects, or concepts.",
  },
];

const safetyLayers = [
  {
    title: "CLAUDE.md rules",
    text: "The vault rulebook says what Claude can edit and what requires confirmation.",
  },
  {
    title: "allowed-tools",
    text: "Slash commands should only expose the tools they truly need.",
  },
  {
    title: "Plan before write",
    text: "For ingestion, Claude should show a plan before changing wiki files.",
  },
  {
    title: "Git history",
    text: "If something goes wrong, git diff shows the change and git checkout can restore files.",
  },
];

const governanceTips = [
  "Commit after big sessions or at the end of the day.",
  "Keep the vault private if it contains personal thoughts or work details.",
  "Use /wiki-query instead of asking Claude to read the whole vault.",
  "Scope large edits to one folder when possible.",
  "Review ingestion plans carefully when the source comes from the web.",
];

const evolutionIdeas = [
  "Move to MCP later if Claude needs Obsidian-only features like Dataview or palette commands.",
  "Add academic research skills for paper discovery, limitations, contributions, and BibTeX.",
  "Share custom ADR and debrief skills with a team if the process becomes standard.",
  "Use session hooks so Claude starts with fresh knowledge of wiki/index.md.",
  "Automate daily note creation with Obsidian CLI when the workflow is stable.",
];

function CodeBlock({ children }) {
  return (
    <pre className="code-block">
      <code>{children}</code>
    </pre>
  );
}

function Header() {
  return (
    <header className="topbar">
      <div>
        <p className="eyebrow">Personal LLM-Wiki Documentation</p>
        <h1>Build an Obsidian vault that Claude can read, organize, and query</h1>
      </div>
      <nav aria-label="Page sections">
        <a href="#overview">Overview</a>
        <a href="#zones">Vault Zones</a>
        <a href="#paths">Connection Paths</a>
        <a href="#starter-plan">Starter Plan</a>
        <a href="#setup">Setup</a>
        <a href="#ingestion">Ingestion</a>
        <a href="#dev-side">Dev Flow</a>
        <a href="#security">Safety</a>
      </nav>
    </header>
  );
}

function Overview() {
  return (
    <section id="overview" className="intro-section">
      <div className="intro-copy">
        <p className="section-kicker">Overview</p>
        <h2>Your personal LLM-Wiki operating system</h2>
        <p>
          You are building a personal knowledge system where Obsidian stores your
          notes and Claude helps turn messy source material into a useful wiki.
          Instead of asking an AI the same question again and again, you let it
          build a long-term memory inside files you own.
        </p>
        <div className="command-row" aria-label="Example commands">
          <span>/wiki-ingest &lt;URL&gt;</span>
          <span>/wiki-query "what do I know about X?"</span>
        </div>
      </div>

      <div className="flow-panel" aria-label="LLM-Wiki flow">
        <div className="flow-step source">
          <strong>Input</strong>
          <span>Articles, PDFs, notes, thoughts</span>
        </div>
        <div className="flow-arrow">&rarr;</div>
        <div className="flow-step agent">
          <strong>Claude</strong>
          <span>Reads, extracts, links, updates</span>
        </div>
        <div className="flow-arrow">&rarr;</div>
        <div className="flow-step vault">
          <strong>Obsidian Vault</strong>
          <span>Connected wiki pages you can search</span>
        </div>
      </div>
    </section>
  );
}

function BeginnerTranslation() {
  return (
    <section className="plain-section">
      <div className="content-grid two-col">
        <article>
          <p className="section-kicker">Beginner Translation</p>
          <h2>Why this matters</h2>
          <p>
            A normal AI chat forgets your project history unless you paste
            everything again. A personal LLM-Wiki keeps knowledge in your own
            folder, using normal Markdown files. Claude becomes a helper that
            reads those files and improves the wiki over time.
          </p>
        </article>
        <article className="note-box">
          <h3>The developer-specific problem</h3>
          <p>
            Developers do not only save reading material. They also save architecture
            decisions, incident notes, code snippets, experiments, and project
            lessons. If those live in a separate place, you lose useful
            connections like: "I read about RAG" and "I chose pgvector for this
            project."
          </p>
        </article>
      </div>

      <div className="content-grid single-col">
        <article className="callout">
          <h3>How the magic commands actually work (Simple Version)</h3>
          <p>
            <strong>You don't do the ingestion work manually.</strong> Once you set up this system, you just give Claude a simple command and it handles all the complex work automatically:
          </p>
          <div style={{marginLeft: '20px'}}>
            <p><strong>You type:</strong> <code>/wiki-ingest https://some-article.com</code></p>
            <p><strong>Then Claude automatically does all this work:</strong></p>
            <ul>
              <li>Downloads and saves the original article in your <code>raw/</code> folder (never changes it)</li>
              <li>Reads the content and identifies key concepts like "machine learning" or "productivity"</li>
              <li>Shows you a plan: "I want to create 3 new concept pages and update 2 existing ones"</li>
              <li>Waits for you to say yes or no</li>
              <li>Only after approval: creates beautiful, cross-linked wiki pages in your <code>wiki/</code> folder</li>
            </ul>
          </div>
          <div style={{marginLeft: '20px', marginTop: '15px'}}>
            <p><strong>You type:</strong> <code>/wiki-query "what do I know about AI safety?"</code></p>
            <p><strong>Then Claude automatically:</strong></p>
            <ul>
              <li>Searches through all your wiki files</li>
              <li>Finds relevant information you've collected over time</li>
              <li>Gives you an answer with links to specific pages</li>
              <li>No need to remember where you saved what - Claude finds it instantly</li>
            </ul>
          </div>
          <p style={{marginTop: '15px'}}>
            <strong>Safety:</strong> Claude always shows you the plan before changing anything. Your original sources are never touched. Everything is backed up in Git so you can undo any change.
          </p>
        </article>
      </div>
    </section>
  );
}

function VaultZones() {
  return (
    <section id="zones" className="plain-section">
      <div className="section-heading">
          <p className="section-kicker">Vault Architecture</p>
        <h2>The vault has three content zones plus one rule file</h2>
        <p>
          The big idea is simple: separate files by who is allowed to change
          them. This prevents your vault from becoming a messy pile of
          AI-generated and human-written notes mixed together.
        </p>
      </div>

      <div className="vault-map" aria-label="Vault architecture diagram">
        <div className="schema-node">
          <span>Zone 0</span>
          <strong>CLAUDE.md</strong>
          <small>The rulebook Claude reads first</small>
        </div>
        <div className="zone-row">
          {zones.map((zone) => (
            <article className={`zone-card ${zone.id}`} key={zone.folder}>
              <span>{zone.label}</span>
              <h3>{zone.folder}</h3>
              <p>{zone.copy}</p>
              <small>{zone.owner}</small>
            </article>
          ))}
        </div>
      </div>

      <div className="rules-grid">
        {rules.map((rule) => (
          <article key={rule.title}>
            <h3>{rule.title}</h3>
            <p>{rule.copy}</p>
          </article>
        ))}
      </div>

      <div className="permission-matrix" aria-label="Folder permission matrix">
        <div className="matrix-heading">
          <h3>Folder permissions in plain English</h3>
          <p>
            This is the safety rule that keeps the vault useful: Claude should
            not treat every folder the same way.
          </p>
        </div>
        <div className="matrix-grid">
          <div className="matrix-cell header">Folder</div>
          <div className="matrix-cell header">Claude can read?</div>
          <div className="matrix-cell header">Claude can edit?</div>
          <div className="matrix-cell header">Why?</div>
          {permissionRows.map(([folder, read, edit, why]) => (
            <React.Fragment key={folder}>
              <div className="matrix-cell folder">{folder}</div>
              <div className="matrix-cell yes">{read}</div>
              <div
                className={`matrix-cell ${
                  edit === "Yes" ? "yes" : edit === "No" ? "no" : "caution"
                }`}
              >
                {edit}
              </div>
              <div className="matrix-cell">{why}</div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

function ConnectionPaths() {
  return (
    <section id="paths" className="plain-section muted-section">
      <div className="section-heading">
          <p className="section-kicker">Connection Choices</p>
        <h2>Three ways Claude can connect to your vault</h2>
        <p>
          Start with the simplest option: let Claude Code work directly with
          Markdown files in your vault folder.
        </p>
      </div>

      <div className="path-comparison" role="list">
        {paths.map((path) => (
          <article
            className={`path-card ${path.recommended ? "recommended" : ""}`}
            key={path.number}
            role="listitem"
          >
            <div className="path-topline">
              <span>{path.number}</span>
              <strong>{path.badge}</strong>
            </div>
            <h3>{path.title}</h3>
            <p>{path.copy}</p>
            <ul>
              {path.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

function StarterPlan() {
  return (
    <section id="starter-plan" className="plain-section">
      <div className="section-heading">
        <p className="section-kicker">What you should understand before doing setup</p>
        <h2>Choose control before convenience</h2>
        <p>
          The foundation is architectural: shape the vault first, then add
          plugins, skills, and automation on top.
        </p>
      </div>

      <div className="timeline">
        {starterSteps.map((step, index) => (
          <article key={step.title}>
            <span>{index + 1}</span>
            <h3>{step.title}</h3>
            <p>{step.copy}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function SetupGuide() {
  return (
    <section id="setup" className="plain-section setup-section">
      <div className="section-heading">
        <p className="section-kicker">Setup</p>
        <h2>Step-by-step setup for your first working vault</h2>
        <p>
          This is where the idea becomes real. You create the folder structure,
          protect it with Git, install Obsidian-aware skills, write the rulebook,
          add your developer-specific skills, and test that Claude follows the
          harness.
        </p>
      </div>

      <div className="setup-flow" aria-label="Setup flow">
        {[
          "Prerequisites",
          "Vault folders",
          "Git safety",
          "Obsidian skills",
          "CLAUDE.md",
          "Custom skills",
          "Slash commands",
          "Verification",
        ].map((step, index) => (
          <div className="setup-node" key={step}>
            <span>{index + 1}</span>
            <strong>{step}</strong>
          </div>
        ))}
      </div>

      <div className="setup-grid">
        <article className="setup-card">
          <p className="section-kicker">3.1</p>
          <h3>Prerequisites</h3>
          <p>
            Before you build the vault, make sure the basic tools are installed.
            If one is missing, stop and install it first.
          </p>
          <ul className="check-list">
            {prerequisites.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="callout">
            New beginner step: run <code>node --version</code>,{" "}
            <code>git --version</code>, and <code>claude --version</code> in
            your terminal so you know the commands are available.
          </div>
        </article>

        <article className="setup-card wide">
          <p className="section-kicker">3.2</p>
          <h3>Create the vault folders</h3>
          <p>
            This creates one Obsidian vault at <code>~/vault</code>. You can use
            another path, but keep the same inner folder structure.
          </p>
          <CodeBlock>{vaultCommands}</CodeBlock>
          <div className="callout">
            After this, open Obsidian, choose "Open folder as vault", and select
            the folder you created.
          </div>
        </article>

        <article className="setup-card wide">
          <p className="section-kicker">3.3</p>
          <h3>Add Git versioning before Claude edits anything</h3>
          <p>
            Git is your undo system. If Claude changes files in a bad way, Git
            lets you inspect exactly what changed and roll back safely.
          </p>
          <p>
            Run this command from inside <code>~/vault</code>. It creates a
            file named <code>.gitignore</code> and puts the ignore rules inside
            it.
          </p>
          <CodeBlock>{gitignoreCreateCommand}</CodeBlock>
          <p>
            The text between <code>cat</code> and <code>EOF</code> is file
            content, not separate terminal commands.
          </p>
          <div className="mini-command-row">
            <code>git add .</code>
            <code>git commit -m "chore: vault structure scaffold"</code>
          </div>
          <div className="callout">
            New beginner step: if Git refuses to commit, configure your identity
            with <code>git config --global user.name "Your Name"</code> and{" "}
            <code>git config --global user.email "you@example.com"</code>.
          </div>
        </article>

        <article className="setup-card wide">
          <p className="section-kicker">3.4</p>
          <h3>Install Obsidian-aware Claude skills</h3>
          <p>
            These skills teach Claude to write in Obsidian's native style
            instead of generic Markdown. The biggest win is correct wikilinks
            like <code>[[Concept Name]]</code>.
          </p>
          <CodeBlock>{skillInstallCommands}</CodeBlock>
          <div className="skill-grid">
            {obsidianSkills.map((skill) => (
              <div className="skill-card" key={skill.name}>
                <strong>{skill.name}</strong>
                <p>{skill.use}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="setup-card wide">
          <p className="section-kicker">3.5</p>
          <h3>Create CLAUDE.md, the vault rulebook</h3>
          <p>
            <code>CLAUDE.md</code> is the brain of the harness. Claude reads it
            at the start of a session and learns what it can touch, what it must
            avoid, and when it has to ask you first.
          </p>
          <p>
            Run this command from anywhere. It moves into <code>~/vault</code>
            and creates <code>CLAUDE.md</code> with a starter rulebook.
          </p>
          <CodeBlock>{claudeMdCreateCommand}</CodeBlock>
          <div className="rule-list">
            {claudeRules.map((rule) => (
              <div className="rule-item" key={rule}>
                <span />
                <p>{rule}</p>
              </div>
            ))}
          </div>
          <div className="frontmatter-demo">
            <h4>Minimum shape of every generated note</h4>
            <CodeBlock>{`---
title: Concept Name
type: concept
tags: [llm-wiki, knowledge-management]
sources:
  - "[[raw/clippings/example]]"
created: 2026-05-01
updated: 2026-05-01
---`}</CodeBlock>
          </div>
        </article>

        <article className="setup-card">
          <p className="section-kicker">3.6</p>
          <h3>Add custom skills for developer notes</h3>
          <p>
            The Obsidian skills teach the app format. Your custom skills teach
            your engineering habits.
          </p>
          <div className="custom-skill-list">
            {customSkills.map((skill) => (
              <div className="custom-skill" key={skill.name}>
                <strong>{skill.name}</strong>
                <code>{skill.folder}</code>
                <p>{skill.purpose}</p>
                <ul>
                  {skill.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </article>

        <article className="setup-card">
          <p className="section-kicker">3.7</p>
          <h3>Create two slash commands</h3>
          <p>
            Skills explain how work should be done. Slash commands are buttons
            you type in chat to start a workflow.
          </p>
          <p>
            Run this once from anywhere. It creates command files inside{" "}
            <code>~/vault/.claude/commands/</code>.
          </p>
          <CodeBlock>{slashCommandCreateCommands}</CodeBlock>
          <div className="usage-grid">
            {slashCommandUsage.map((command) => (
              <div className="usage-card" key={command.name}>
                <strong>{command.name}</strong>
                <p>{command.when}</p>
                <code>{command.example}</code>
              </div>
            ))}
          </div>
          <div className="command-cards">
            {slashCommands.map((command) => (
              <div className="command-card" key={command.name}>
                <strong>{command.name}</strong>
                <p>{command.purpose}</p>
                <ol>
                  {command.flow.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
          <div className="callout">
            The important safety design: <code>/wiki-ingest</code> shows a plan
            before it writes to <code>wiki/</code>.
          </div>
        </article>

        <article className="setup-card wide">
          <p className="section-kicker">3.8</p>
          <h3>Verify the harness</h3>
          <p>
            Start Claude from inside the vault and ask simple questions that
            prove it can see the skills and understand the rules.
          </p>
          <div className="mini-command-row">
            <code>cd ~/vault</code>
            <code>claude</code>
          </div>
          <div className="verification-grid">
            {verificationChecks.map((check) => (
              <div className="verification-card" key={check.prompt}>
                <strong>{check.prompt}</strong>
                <p>{check.expected}</p>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}

function IngestionWalkthrough() {
  return (
    <>
      <section id="ingestion" className="plain-section ingestion-section">
        <div className="section-heading">
          <p className="section-kicker">Ingestion Workflow</p>
          <h2>The first real ingestion, end to end</h2>
          <p>
            This is what should happen when you ask Claude to ingest one source.
            The goal is not just saving a page. The goal is turning that page
            into connected knowledge inside your vault.
          </p>
        </div>

        <div className="ingest-command-panel">
          <div>
            <p className="section-kicker">Starting command</p>
            <h3>One URL enters the system</h3>
            <p>
              You provide a source. Claude cleans it, saves the untouched version
              in <code>raw/</code>, then proposes how it should affect the wiki.
            </p>
          </div>
          <CodeBlock>{"/wiki-ingest https://example.com/file-over-app"}</CodeBlock>
        </div>

        <div className="ingestion-lane" aria-label="Ingestion lifecycle">
          {ingestionSteps.map((step, index) => (
            <article className="ingestion-step" key={step.title}>
              <span>{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.detail}</p>
            </article>
          ))}
        </div>

        <div className="content-grid two-col ingestion-detail-grid">
          <article className="setup-card">
            <p className="section-kicker">Raw save</p>
            <h3>The source goes into raw/clippings/</h3>
            <p>
              This file is the evidence copy. Claude can cite it later, but it
              should not rewrite it after saving.
            </p>
            <CodeBlock>{`---
title: File over app
author: Utsav Mehrotra
source-url: https://example.com/file-over-app
captured-date: 2026-05-01
tags: [philosophy, knowledge-management, obsidian]
---

Clean source content goes here.`}</CodeBlock>
          </article>

          <article className="setup-card">
            <p className="section-kicker">Review gate</p>
            <h3>The plan appears before wiki edits</h3>
            <p>
              This is the safety moment. Claude says what it found, what it wants
              to create, what it wants to update, and asks for permission.
            </p>
            <div className="plan-stack">
              {ingestionPlan.map((group) => (
                <div className="plan-group" key={group.label}>
                  <strong>{group.label}</strong>
                  <ul>
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </article>
        </div>

        <div className="result-panel">
          <div>
            <p className="section-kicker">After approval</p>
            <h3>Claude changes the wiki and gives you a receipt</h3>
            <p>
              The report matters because it keeps the agent accountable. You can
              compare this list with <code>git diff</code> if anything looks odd.
            </p>
          </div>
          <div className="file-change-list">
            {changedFiles.map(([status, file]) => (
              <div className="file-change" key={file}>
                <span className={status.toLowerCase()}>{status}</span>
                <code>{file}</code>
              </div>
            ))}
          </div>
        </div>

        <div className="graph-panel">
          <div className="graph-copy">
            <p className="section-kicker">Why the system compounds</p>
            <h3>Every ingestion adds paths through your knowledge</h3>
            <p>
              The useful part is not a single summary. The useful part is the
              new web of links: future searches can travel from a design idea to
              a person, a project decision, or another concept.
            </p>
          </div>
          <div className="knowledge-graph" aria-label="Knowledge graph example">
            {graphNodes.map((node, index) => (
              <div className={`graph-node node-${index + 1}`} key={node}>
                {node}
              </div>
            ))}
            <span className="graph-line line-1" />
            <span className="graph-line line-2" />
            <span className="graph-line line-3" />
            <span className="graph-line line-4" />
            <span className="graph-line line-5" />
          </div>
        </div>
      </section>

      <section id="dev-side" className="plain-section dev-side-section">
        <div className="section-heading">
          <p className="section-kicker">Developer Workflow</p>
          <h2>ADRs turn technical debates into durable decisions</h2>
          <p>
            The dev side is where the vault stops being only a reading memory.
            It becomes a record of how you made engineering decisions, what
            evidence you had, and why you chose one path over another.
          </p>
        </div>

        <div className="adr-question-panel">
          <div>
            <p className="section-kicker">Example request</p>
            <h3>Claude starts with a draft, not a final decision</h3>
            <p>
              If you are still deciding between pgvector and Qdrant, the ADR
              should stay <code>proposed</code>. The decision section can remain
              empty until the benchmarks and reasoning are complete.
            </p>
          </div>
          <CodeBlock>{`Create a draft ADR for choosing pgvector or Qdrant
for the RAG part of my thesis project.`}</CodeBlock>
        </div>

        <div className="dev-choice-panel">
          <article>
            <span>Option A</span>
            <h3>pgvector</h3>
            <p>Postgres-based vector search that fits teams already using SQL and relational data.</p>
          </article>
          <article>
            <span>Option B</span>
            <h3>Qdrant</h3>
            <p>A dedicated vector database that may fit heavier vector-search workloads.</p>
          </article>
          <article className="decision-card">
            <span>dev/ output</span>
            <h3>ADR</h3>
            <p>The decision should become an Architecture Decision Record with context, choice, consequences, and references.</p>
          </article>
        </div>

        <div className="adr-flow">
          {adrFlow.map((step, index) => (
            <div className="adr-flow-step" key={step}>
              <span>{index + 1}</span>
              <strong>{step}</strong>
            </div>
          ))}
        </div>

        <div className="adr-artifact-grid">
          {adrArtifacts.map(([label, text]) => (
            <article key={label}>
              <span>{label}</span>
              <p>{text}</p>
            </article>
          ))}
        </div>

        <div className="research-decision-map" aria-label="Research to decision map">
          <div className="map-node raw-node">raw/ benchmark notes</div>
          <div className="map-node wiki-node">wiki/ RAG concepts</div>
          <div className="map-node dev-node">dev/ ADR-0008</div>
          <div className="map-node final-node">accepted decision</div>
        </div>
      </section>
    </>
  );
}

function DailyNotes() {
  return (
    <section id="daily-notes" className="plain-section daily-section">
      <div className="section-heading">
        <p className="section-kicker">Daily Notes</p>
        <h2>Daily notes stay in raw/, then become weekly synthesis input</h2>
        <p>
          Daily notes are your stream of consciousness. Claude should read them
          later, but it should not rewrite them. That is why they live in{" "}
          <code>raw/daily/</code>.
        </p>
      </div>

      <div className="daily-layout">
        <article className="setup-card">
          <h3>Where daily notes live</h3>
          <CodeBlock>{`raw/daily/
  2026-04-28.md
  2026-04-29.md
  2026-04-30.md
  2026-05-01.md`}</CodeBlock>
          <p>
            Do not force heavy structure here. Write quick thoughts, links,
            meeting notes, bugs, or half-formed decisions.
          </p>
        </article>

        <article className="setup-card">
          <h3>The weekly synthesis request</h3>
          <p>
            Once a week, ask Claude to read a date range and produce a report
            only. It should not create files until you approve the next action.
          </p>
          <CodeBlock>{`Synthesize this week of raw/daily notes.
Find recurring themes, pending decisions,
concept candidates, and possible ADR links.
Do not create files yet.`}</CodeBlock>
        </article>
      </div>

      <div className="synthesis-grid">
        {dailySynthesis.map((item) => (
          <article key={item.label}>
            <h3>{item.label}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function SecurityGovernance() {
  return (
    <section id="security" className="plain-section security-section">
      <div className="section-heading">
        <p className="section-kicker">Security And Governance</p>
        <h2>Security is handled with layers, not blind trust</h2>
        <p>
          Claude can read and write files, so the workflow needs guardrails.
          The safety model is defense in depth: rules, limited tools, review
          gates, and Git.
        </p>
      </div>

      <div className="risk-grid">
        <article>
          <h3>What can go wrong?</h3>
          <p>Files could be deleted, overwritten, leaked into model context, or influenced by malicious text inside a web page.</p>
        </article>
        <article>
          <h3>What reduces the risk?</h3>
          <p>Clear write zones, approval before big edits, narrow slash-command tools, private version control, and regular review.</p>
        </article>
      </div>

      <div className="safety-stack">
        {safetyLayers.map((layer) => (
          <article key={layer.title}>
            <h3>{layer.title}</h3>
            <p>{layer.text}</p>
          </article>
        ))}
      </div>

      <div className="content-grid two-col">
        <article className="setup-card">
          <h3>Git safety loop</h3>
          <CodeBlock>{`cd ~/vault
git add .
git commit -m "wiki: ingest latest notes"

git diff HEAD~1 wiki/
git checkout HEAD~1 -- wiki/concepts/X.md`}</CodeBlock>
        </article>

        <article className="setup-card">
          <h3>Practical governance rules</h3>
          <ul className="check-list">
            {governanceTips.map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}

function AutomationTips() {
  return (
    <section id="automation" className="plain-section">
      <div className="section-heading">
        <p className="section-kicker">Advanced Automation</p>
        <h2>Make Claude automatically check your wiki</h2>
        <p>
          By default, Claude won't automatically search your wiki. Here's how to make it more proactive about using your existing knowledge.
        </p>
      </div>

      <div className="content-grid single-col">
        <article className="callout">
          <h3>What are Hooks?</h3>
          <p>
            <strong>Hooks are automatic triggers</strong> that make Claude do specific actions at certain moments (like when you start a session or make a commit).
          </p>
          <p><strong>Think of hooks like:</strong></p>
          <ul>
            <li><strong>A doorbell</strong> - When you arrive (session-start), Claude automatically greets you with your wiki summary</li>
            <li><strong>A reminder alarm</strong> - When you leave (session-end), Claude reminds you to save important conversations</li>
            <li><strong>A safety check</strong> - Before editing wiki files, Claude warns you about breaking links</li>
          </ul>
          <p>
            <strong>Benefits:</strong> Instead of remembering to manually tell Claude "check my wiki" every time, hooks make it happen automatically. This saves time and ensures Claude always has context about your existing knowledge.
          </p>
        </article>
      </div>

      <div className="content-grid two-col">
        <article className="setup-card">
          <h3>Enhanced CLAUDE.md Rules</h3>
          <p>
            Add these rules to your <code>CLAUDE.md</code> to make Claude automatically check the wiki before answering questions:
          </p>
          <CodeBlock>{`## When to check the wiki
- Before answering questions about technical topics, search wiki/ first
- When I mention wanting to learn something new, check if we already have notes
- If I ask about past decisions, look in dev/adr/ folder
- When discussing projects, search for related concepts and entities`}</CodeBlock>
        </article>

        <article className="setup-card">
          <h3>Session Hooks (Advanced)</h3>
          <p>
            Set up Claude Code hooks to automatically load wiki context when you start a session. Follow these steps:
          </p>

          <div style={{marginBottom: '15px'}}>
            <h4>Step 1: Open Claude Code Settings</h4>
            <CodeBlock>{`# In Claude Code, run:
/update-config

# Or manually edit the settings file:
# ~/.claude/settings.json (Mac/Linux)
# %USERPROFILE%\\.claude\\settings.json (Windows)`}</CodeBlock>
          </div>

          <div style={{marginBottom: '15px'}}>
            <h4>Step 2: Add Session Hook</h4>
            <p>Add or update the hooks section in your settings.json:</p>
            <CodeBlock>{`{
  "hooks": {
    "session-start": "Read wiki/index.md to understand available knowledge, then briefly summarize what topics I have in my knowledge base."
  }
}`}</CodeBlock>
          </div>

          <div>
            <h4>Step 3: Test the Hook</h4>
            <CodeBlock>{`# Start a new Claude Code session in your vault
cd ~/vault
claude-code

# You should see Claude automatically read your wiki and say something like:
# "I can see your knowledge base contains concepts about X, Y, Z..."`}</CodeBlock>
          </div>
        </article>
      </div>

      <div className="content-grid single-col">
        <article className="setup-card wide">
          <h3>Additional Useful Hooks</h3>
          <p>Here are more hooks you can add to enhance your LLM-Wiki workflow:</p>

          <CodeBlock>{`{
  "hooks": {
    "session-start": "Read wiki/index.md to understand available knowledge",
    "session-end": "If we created or updated any significant knowledge during this session, suggest running /wiki-ingest on our conversation",
    "before-edit": "If editing files in wiki/, remind me to check if this might break any existing cross-links",
    "after-commit": "Briefly summarize what knowledge was added or changed in this commit"
  }
}`}</CodeBlock>

          <div style={{marginTop: '10px'}}>
            <p><strong>Hook Explanations:</strong></p>
            <ul>
              <li><strong>session-start:</strong> Auto-loads wiki context</li>
              <li><strong>session-end:</strong> Suggests preserving valuable conversations</li>
              <li><strong>before-edit:</strong> Prevents accidentally breaking wiki links</li>
              <li><strong>after-commit:</strong> Helps track knowledge evolution</li>
            </ul>
          </div>
        </article>

        <article className="callout">
          <h3>Best Practice Workflow</h3>
          <p><strong>Hybrid approach works best:</strong></p>
          <ul>
            <li><strong>Automatic:</strong> Claude starts sessions knowing your wiki exists (via CLAUDE.md)</li>
            <li><strong>Manual:</strong> You explicitly use <code>/wiki-query</code> when you want specific knowledge</li>
            <li><strong>Contextual:</strong> You remind Claude to check wiki when starting new topics</li>
          </ul>
          <p><strong>Example conversation flow:</strong></p>
          <div style={{marginLeft: '20px', fontFamily: 'monospace', fontSize: '0.9em', background: '#f5f5f5', padding: '10px', borderRadius: '4px'}}>
            <p><strong>You:</strong> "I want to build a payment system"</p>
            <p><strong>Claude:</strong> "Let me check your wiki first for any existing knowledge..."</p>
            <p><em>[Claude searches and finds your payment service docs]</em></p>
            <p><strong>Claude:</strong> "I see you already have notes about PCI compliance and processor routing. Based on that..."</p>
          </div>
        </article>
      </div>
    </section>
  );
}

function EvolutionClosing() {
  return (
    <section id="evolution" className="plain-section evolution-section">
      <div className="section-heading">
        <p className="section-kicker">Next Steps</p>
        <h2>The vault starts simple, then grows into knowledge infrastructure</h2>
        <p>
          The starting setup is intentionally file-first and understandable.
          Later, you can add more automation only when the need is real.
        </p>
      </div>

      <div className="evolution-grid">
        {evolutionIdeas.map((idea) => (
          <article key={idea}>
            <p>{idea}</p>
          </article>
        ))}
      </div>

      <div className="closing-panel">
        <h3>Final mental model</h3>
        <p>
          <code>raw/</code> stores what you collected. <code>wiki/</code> stores
          what Claude synthesized. <code>dev/</code> stores how your technical
          work evolved. <code>CLAUDE.md</code>, skills, slash commands, and Git
          are the harness that keeps the system useful instead of chaotic.
        </p>
        <p>
          The value compounds because every new source, benchmark, ADR, and
          debrief creates more paths through the vault. Over time, it becomes a
          searchable history of what you learned and why you made each decision.
        </p>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Overview />
        <BeginnerTranslation />
        <VaultZones />
        <ConnectionPaths />
        <StarterPlan />
        <SetupGuide />
        <IngestionWalkthrough />
        <DailyNotes />
        <SecurityGovernance />
        <AutomationTips />
        <EvolutionClosing />
      </main>
    </>
  );
}
