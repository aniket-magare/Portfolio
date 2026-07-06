const fs = require('fs');

const markdownContent = `
*(Note: - The document contains detailed explanations with reference sources to ensure the research is credible and well supported. Summary has been added after section 2 were explanation is longer)*

### Question 1: Art Asset Production Pipeline

**Google Sheet link:** [View Model](https://docs.google.com/spreadsheets/d/1vkImwW9gayYWUbAIfhGlEy6UB9aVgBZedc7h7kLWTzc/edit?usp=sharing)

**Written Explanation**

This model breaks down the entire art assets production pipeline for a stylized semi-realistic COD Zombies-themed mobile game with a single map. The aim was to approximate the number of assets, justify it with some genre research, estimate the production time, calculate the number of employees needed, and verify if it is feasible to complete the project and have a soft launch period of 6 months after a 9 month development phase. Everything is formula-based and scalable so that the model can automatically adjust with any changes in the scope.

**Asset Quantities and Reasoning:**
The asset list was determined by taking apart the design of traditional COD Zombies maps and similar mobile shooters. These shooters usually combine the effects of enemy variation, gun variation, the use of modulated maps, and good graphical effects to ensure game replay value. For instance, the model has 10 basic types of zombies, which matches the 8 to 12 types usually found in Zombies style shooters to avoid graphical repetition when playing long survival missions. Other game characters, like runners, armored zombies, and elemental zombies, and a boss, were used to ensure game progression.

The numbers of guns were also science-based. COD Zombies maps typically have 12-16 guns broken down by pistols, SMGs, ARs, SGs, Snipers, and LMGs. The resources include 14 base guns, each with a Pack a Punch guns resource, totaling 28 gun resources. Environment resources are estimated by a standard Zombies cartography, breaking down into 4-6 main areas on a given map. In this model, five are used: Spawn, Courtyard, Laboratory, Bunker, and Ritual Room. In an aim to facilitate optimal production, 65 modular resources (walls, floors, doors, stairs, debris, barricades) were used, as per standard modular design techniques.

The number of props, VFX, UI, and animation data is based on gameplay necessities. The interactive props, like perk machine props, ammo props, and ritual props, are required for Zombies gameplay style. VFX data is required for elemental zombie gameplay, weapon effects, and ambiance. UI elements involve HUD, weapon icon, perk icon, and menu screens. The number of animation data is based on the number of zombie types and weapons available.

**Total Hours and Staffing Requirements:**
The complexity level of each asset and the corresponding hours required per asset were determined by the typical benchmark hours of mobile 3D art production. The total hours required by all assets to produce the artwork required calculations in formulas, which resulted in 7440 hours required for the artwork production.

This workload can now be segmented by the roles in the artistic team, which are assigned percentages by the model: Concept (10%), 3D Character (30%), 3D Environment (25%), VFX (15%), UI (10%), and Animation (10%). Hours for each of the roles can now automatically be calculated. Full-time artists will commit 1440 hours for 9 months (160 hours/month × 9). Using hours needed/hours available for each role gives the total headcount required.

**Timeline Feasibility:**
The Timeline sheet evaluates the total hours (7440) against the total team capacity (7440). Because the capacity fulfills the need, the model verifies that the art team will be able to accomplish the production task within the 9 month development timeline. However, the soft launch activities will take place within the next 6 months.

**Scalability:**
The approach is completely formula based. Any asset variable change, type, or hours affects the total hours, resource requirement, and viability of the timeline. This ensures flexibility in the pipeline.

### Question 2: Battle Pass Art Strategy Analysis

**1. Fortnite (Mobile)**
*   **Latest Season Theme:** Chapter 6 Season 1 (Japanese Mythology + Disney's Baymax)
*   **Art Direction Strategy:** "The Metaverse Blender" (Radical stylistic variety. Cel-shaded anime next to photoreal IP. No cohesion is the goal.)
*   **Primary Purchase Driver:** Social Expression (Skins are avatars for the "Hangout" lobby. "Super Styles" drive late-season retention.)
*   **Differentiation:** Pop-Culture Speed (Integrating massive IPs directly into the pass faster than anyone else.)
*   **Key Visual Hook:** Baymax (Big White Silhouette)

**2. Brawl Stars**
*   **Latest Season Theme:** Mechmas + Stranger Things (Retro 80s Horror meets High-Tech Mecha)
*   **Art Direction Strategy:** "Theme & Variation" (Strong central silhouette re-interpreted through a specific IP or distinct style.)
*   **Primary Purchase Driver:** Power Fantasy / Hypercharge (Visuals linked to gameplay power. "I look distinct, I am the carry.")
*   **Differentiation:** Character Re-Contextualization (Skins change the genre of the character e.g., Bear to Demogorgon.)
*   **Key Visual Hook:** Eleven (Stranger Things)

**3. Call of Duty: Mobile**
*   **Latest Season Theme:** S11: Winter Ops (Tactical Winter gear mixed with stylized "Karate/Anime" elements)
*   **Art Direction Strategy:** "Tactical Fantasy" (Grounded military silhouettes upgraded with sci-fi geometry and glowing emissives.)
*   **Primary Purchase Driver:** The "Pay-to-Win" Sight (Weapon blueprints with cleaner iron sights offer a perceived competitive edge.)
*   **Differentiation:** Asset Density (Quantity over singular quality. 4 characters + 5 epics feels like massive value.)
*   **Key Visual Hook:** Custom Geometry Iron Sights

**4. Arena Breakout**
*   **Latest Season Theme:** Season 3 (PMC Streetwear / Gritty Cyberpunk)
*   **Art Direction Strategy:** "Grounded Drip" (Hyper-realistic textures. Vanity items must look functional.)
*   **Primary Purchase Driver:** Intimidation & Status (Gear implies experience. Looking "Elite" strikes fear in a high-stakes environment.)
*   **Differentiation:** Immersion Fidelity (Refusal to break the "Hardcore" aesthetic preserves the game's tension.)
*   **Key Visual Hook:** The "Cyberpunk" Jacket

**5. BGMI**
*   **Latest Season Theme:** A16: Polar Quest (Fantasy Ice, Crystal armors, & Penguin Meme Suits)
*   **Art Direction Strategy:** "Maximalist Mythic" (High-contrast, glowing, animated textures designed to pop on mobile screens.)
*   **Primary Purchase Driver:** Customization Flex (Color-changing "Mythic" outfits allow for unique looks in social lobbies.)
*   **Differentiation:** Regional Tuning (Aesthetics specifically tuned for the Indian market's love of bright, flashy status symbols.)
*   **Key Visual Hook:** Color-Changing Mythic Set
`;

const markdownContent2 = `
### Part A: Research Methodology (Simple, Human Version)

This Research is about understanding what makes recent mobile game ads work for three specific titles:
*   **Free Fire** (Shooter)
*   **Episode** (Dating)
*   **Merge Mansion** (Casual Puzzle / Merge)

The idea was not just to collect examples, but to break them down so we can clearly see how these ads were chosen and why they perform well.

**1. How the campaigns were chosen**
First, the time frame was limited to roughly the last 6 months wherever possible, focusing on campaigns that were clearly live, visible, and impactful (downloads, revenue, buzz, or case-study worthy).

For each game, campaigns were shortlisted if they:
*   Were recent, not old legacy ones.
*   Had some sign of real performance impact like spikes in downloads, revenue, or mentions.
*   Showed interesting creative ideas like celebrity storytelling, strong narrative hooks, localized themes, etc.
*   Had enough public detail to actually analyze them not just a one-line mention.

This is how the research landed on:
*   Free Fire’s India-focused cricket/event activations and community efforts like Booyah Awards.
*   Episode’s drama-heavy story clips and video-based UA strategy.
*   Merge Mansion’s mystery-led Kathy Bates campaign and Japan localization push.

**2. What sources were used**
To avoid a one-sided view, the research combined data tools, case studies, blogs, and formal research:

*   **Market and ad data tools:** Used for numbers like daily active users, downloads, retention, revenue trends, and ad format distribution. Also used to see which networks and formats are most used (rewarded video vs full-screen vs playables).
*   **Official and agency case studies:** These explain the "why" behind big campaigns in plain language (e.g., BBH’s Free Fire "Battle in Style" brand platform; Metacore's localization for Japan).
*   **Industry blogs and performance guides:** Mobile marketing blogs and tools that publish examples of top-performing creatives, trends like UGC, hook tactics, and playable ads.
*   **Regulatory and academic material:** Used to understand risks around fake gameplay advertising and how people actually watch and interact with mobile video ads.

**3. How each ad was broken down**
After picking the campaigns, each creative was viewed through the same simple pattern so they could be compared across genres:

*   **Hook (first 3–4 seconds):** What happens immediately on screen (big movement, shocking drama, a curious question). This matters because attention drops fast, and strong hooks keep people watching.
*   **Story and emotion:** Does the ad show straight gameplay, a mini story (mystery, relationship conflict), or a character’s emotional choice?
*   **Visual / production style:** Live action, CGI, in-engine renders, or UGC-style footage.
*   **Format and placement:** Whether the creative is a rewarded video, full-screen video, playable, TikTok/Reel-style short, or in-feed social video.
*   **Call to action (CTA):** “Download now”, “Try to solve this”, often tied to time-limited events.

**4. How success was measured**
Because not every campaign shares full internal data, success was read using a mix of public numbers, strong signals, and standard benchmarks:

*   **Direct public data:** (e.g., Free Fire daily active players; Merge Mansion's ~100% increase in downloads from the Kathy Bates campaign, 460% surge in social mentions).
*   **Strong signals / proxies:** Being featured in case studies as a "standout" campaign; noticeable spikes in brand search; high share of spend on particular formats.
*   **External benchmarks:** Industry reports were used for typical ranges of CTR, CPI, ROAS, and completion rates.

**5. How cross-genre insights were pulled together**
After breaking down campaigns for all three games, the last step was to zoom out and look for patterns:
*   Comparing Free Fire, Episode, and Merge Mansion on: Hook style, Story vs gameplay balance, Visual/production style, Formats, Localization depth.
*   Checking these patterns against 2025 industry trends (rise of UGC, AI testing, shift to narrative-driven ads).
*   Validating that the observations seen in these three games were echoed in independent reports, not just brand-owned stories.
`;

const markdownContent3 = `
### Part B: Campaign Analysis by Genre

This section explains what each game did in its ads, in simple language, and why those campaigns worked.

#### 1. Free Fire (Shooter)
Free Fire’s marketing leans heavily on events, culture, and community, especially in India. The creatives are fast, loud, and closely tied to what players already love in real life.

**a) Cricket Event Push – "Battle on Cricket Island" (India, 2025)**
For India, Free Fire used cricket as its main hook during the IPL season. Creatives and in-game content were built around a cricket-themed event.
*   **What the ads did:** Showed cricket imagery plus action gameplay (outfits, stadium vibes); Used Hindi language and Indian cultural cues; Ran a very high number of creatives (around 150 per day) targeted at India.
*   **Why it worked:** Cricket is an emotional topic in India, making the ads instantly relevant. Local language and references made players feel the game "belongs" in their culture.

**b) Booyah Awards 2025 – Community & Creators**
The Booyah Awards 2025 centered on players and creators, not just the game itself.
*   **What the ads did:** Highlighted real people (streamers, creators) often in Hindi; Used short social videos and Reels to show hype, winners, and behind-the-scenes clips.
*   **Why it worked:** Turned Free Fire into a community and lifestyle brand. Gave creators and players a reason to post, share, and talk about the game themselves.

**c) KFC Thailand Collaboration**
In Thailand, Free Fire partnered with KFC, blending fast food and gaming.
*   **What the ads did:** Promoted in-game items themed around KFC in video ads; Framed the collab as a limited-time event.
*   **Why it worked:** A big mainstream brand like KFC brings attention even from non-shooters. The lighthearted crossover softened the "hardcore" shooter edge.

#### 2. Episode (Dating Sim / Interactive Stories)
Episode sells fantasy, drama, and choices rather than graphics. Its strongest ads feel like short emotional scenes from a TV show.

**a) Drama-Based Story Clips & Video Ads**
*   **What the ads did:** Showed tense or juicy situations (cheating, breakups, secrets) and then paused to show choices like "Run away" vs. "Confront them". Positioned the app as "like Netflix but interactive".
*   **Why it worked:** Directly tapped into viewers’ emotional curiosity ("What would I do?"). Matched how the target audience uses their phones: snackable, story-based content.

**b) TikTok & Short-Form Story Previews**
*   **What the ads did:** Created 15–30 second vertical story previews ending right before the outcome is revealed. Encouraged comments and duets to debate the "right" choice.
*   **Why it worked:** Relationship drama performs well on TikTok. The ads feel like native content you’d watch anyway.

**c) Influencers & Dating-Style Marketing**
*   **What the ads did:** Partnered with influencers in lifestyle and relationships to talk about "addictive interactive stories". Used soft, story-first selling.
*   **Why it worked:** Blended into the existing dating/relationship conversation online. Leveraged trust from creators for a young, female-skewing audience.

#### 3. Merge Mansion (Casual Puzzle)
Merge Mansion is technically a puzzle game, but its most famous ads look like trailers for a mystery TV show.

**a) "What is Grandma Hiding?" – Kathy Bates Live-Action Campaign**
*   **What the ads did:** Cast Kathy Bates as the mysterious grandma in live-action scenes. Focused on suspense and family secrets with very little direct gameplay. Repeated the central mystery line until it became a meme.
*   **Why it worked:** Completely broke the pattern of typical puzzle ads. Generated conversation well beyond the game’s core audience, delivering big increases in downloads and PR impressions.

**b) Japan Hyper-Localized Campaign**
In Japan, the team re-imagined their marketing specifically for that market instead of just translating their global ads.
*   **What the ads did:** Featured Nagisa Shibuya (Japanese actress) to front the campaign. Localized every major touchpoint and carefully reviewed copy to ensure politeness and cultural appropriateness.
*   **Why it worked:** Showed respect and understanding of local culture, producing measurable improvements in installs and search volume in Japan.

**c) Live Events & Revenue-Driven Ads**
*   **What the ads did:** Promoted special events like "Merge it Up!" where merging unlocks rewards. Used clear "limited time" messaging.
*   **Why it worked:** Live events give players a fresh reason to come back and spend.
`;

const markdownContent4 = `
### Part C: Key Insights (Human, Cross-Genre)

**1. The first 3–4 seconds decide everything**
Across shooter, dating, and puzzle, the opening seconds of the ad were critical.
*   **What works well:** Instant movement or surprise; A sharp emotional moment (a betrayal scene or shocking reveal); A simple curiosity hook (“What is Grandma hiding?”).
*   **Why it matters:** People scroll fast; if the hook is weak, they never see the rest. A key lesson is to design creatives "hook-first," prototyping multiple alternative openings before investing in full production.

**2. Story and emotion beat raw gameplay**
A clear pattern emerges: good ads sell the fantasy and emotion first, gameplay second.
*   Episode showcases dramatic choices rather than UI.
*   Merge Mansion almost hides gameplay behind a live-action mystery.
*   Free Fire foregrounds lifestyle and community instead of only killstreaks.
*   **Takeaway:** Most players install because they want to feel something specific (powerful, desired, clever, curious). Ads that dramatize that feeling outperform straightforward gameplay montages.

**3. Authenticity and UGC Are Now Core, Not Extra**
User-generated and influencer-style content has become a core performance engine.
*   Creatives that look like real players filming at home or split-screen reaction formats deliver strong engagement and lower costs.
*   Viewers increasingly trust what looks like genuine player experience more than traditional TV spots.

**4. Deep Localization Outperforms Simple Translation**
Free Fire’s India push and Merge Mansion’s Japan strategy show how deeply localized creative transforms performance. Instead of reusing global assets with subtitles, these campaigns started from local culture (cricket in India, local celebrities and norms in Japan).
*   **Lesson:** Localization should be treated as creative strategy, not just language operations.

**5. Formats Are Converging Around Video, Events, and Interactivity**
Winning approaches specialize in core formats: short vertical video for social, rewarded/full-screen video in UA, and playables.

**6. Creative Is a Continuous Experiment, Increasingly Powered by Data and AI**
Behind each campaign is a mindset of continuous testing: new hooks, storylines, and event tie-ins. The industry is treating creative as an iterative product, using data and AI tools to rapidly prototype and test variants.
`;

const markdownContent5 = `
### Part B: Application of Insights for LILA Black (Casual Extraction Shooter)

LILA Black sits in a really interesting space: it is an extraction shooter, but positioned as more accessible, fast, and mobile friendly than the very hardcore PC titles. The creative can lean into tension and high stakes, but still feel fun and approachable.

**1. "One Run, One Decision"**
*   **Idea:** Ads built around a single, high pressure decision in a match. Example: the squad has the cube, alarms are going off, and you have to decide whether to push for extra loot or extract now.
*   **Why it works:** Extraction lives on that risk versus reward moment. It’s the shooter version of Episode’s "what would you choose?" It sells the feeling of making clutch calls, which converts better than just showing UI.

**2. "Casual Tarkov" Positioning**
*   **Idea:** Creatives highlighting that LILA Black is built for mobile sessions—clear objectives, readable maps, but still with meaningful loss if you fail.
*   **Why it works:** Fills the clear gap between hyper-hardcore PC extraction experiences and more approachable mobile shooters like Free Fire. It speaks directly to players intimidated by full loss of progress.

**3. Contract Missions as Mini Episodes**
*   **Idea:** Each ad focuses on one contract type (e.g., Uplink, Protect Package) and treats it like a short mission story: "Tonight’s contract: protect the package, extract alive."
*   **Why it works:** Episodic framing worked very well for Merge Mansion and Episode. It helps onboard new players without overwhelming them and provides a structure for live operations marketing.

**4. Squad UGC and "We Almost Lost Everything" Moments**
*   **Idea:** UGC style ads recorded like a friend’s vertical screen capture with voice chat, showing a squad panicking as they barely make it to extraction.
*   **Why it works:** Extraction shooters are very social. It shows the stakes and systems indirectly through real reactions, matching the mobile TikTok aesthetic.

**5. "From Naked to Kitted" Progression Ads**
*   **Idea:** Before and after style creatives showing a character starting with basic gear and ending up in fully customized, premium loadouts after several runs.
*   **Why it works:** Taps into the status fantasy ("if I keep playing, I will look like this") and clearly communicates long-term payoff.

**6. Local "Legendary Run" Stories**
*   **Idea:** For key markets, build localized ads where a local-style character narrates their "legendary run" in their own slang, with gameplay in the background.
*   **Why it works:** Makes LILA Black feel like "our" game in each region, replicating Free Fire's success in localized event tie-ins.

### Application of Insights for Heart’s Desire (Dating Sim)

Heart’s Desire is much closer to Episode in its core fantasy: interactive romance, secrets, and choices that lead to different endings.

**1. "One Choice, Two Outcomes"**
*   **Idea:** Ads that freeze on a big decision, then quickly show two radically different outcomes side by side (e.g., trusting a character vs confronting them).
*   **Why it works:** Packs the core value proposition ("your choices really matter here") into a very short format, creating a natural urge to comment and debate.

**2. "She Has a Secret" Character Trailers**
*   **Idea:** Short spotlights that introduce a love interest, then end by teasing a secret or twist: "But there is something she is not telling you."
*   **Why it works:** Builds attachment to individual characters before players even install, which is key for narrative games.

**3. TikTok Style "POV You Messed Up" Clips**
*   **Idea:** Vertical, meme-friendly clips framed as "POV you picked the wrong option," with quick cuts of escalating drama.
*   **Why it works:** POV and relationship drama already thrives on TikTok. It feels like native content rather than a traditional ad.

**4. Chat Thread Stories**
*   **Idea:** Ads that play out entirely as a text chat between the player and a love interest.
*   **Why it works:** Players are used to reading chat screens on mobile (no cognitive friction). It conveys drama cheaply and effectively.

**5. Male Narrator UGC: "This Went Way Further Than I Expected"**
*   **Idea:** Creator-style ads where a male narrator casually talks about starting Heart’s Desire as a simple game, but getting wrapped into intense drama.
*   **Why it works:** Appeals to male audiences and addresses possible skepticism head-on. Honest, self-deprecating UGC is highly effective.

**6. "City of Choices" Lifestyle Montage**
*   **Idea:** Ads that focus on the overall lifestyle fantasy (city views, dates, nightlife) rather than individual dialogues.
*   **Why it works:** Attracts users more interested in escapism and aspirational experiences than pure "waifu collector" framing.
`;

const dataPath = './src/data/caseStudies.json';
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// Find Lila Games
const lilaIndex = data.findIndex(c => c.slug === 'lila-games-product-roadmap');

if (lilaIndex !== -1) {
  data[lilaIndex].detailedSections = [
    { heading: "Section I: Art Team Management & Pipeline", content: markdownContent },
    { heading: "Section II: User Acquisition & Growth", content: markdownContent2 },
    { heading: "Campaign Analysis by Genre", content: markdownContent3 },
    { heading: "Key Insights (Cross-Genre)", content: markdownContent4 },
    { heading: "Application of Insights", content: markdownContent5 }
  ];
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
  console.log("Updated caseStudies.json successfully.");
} else {
  console.log("Could not find Lila Games in JSON.");
}
