/**
 * A Drop of Time — shared sidebar for local DOCS browsing (file:// or http://).
 * Expects: <script id="adot-doc-nav" data-depth="N" src=".../nav.js"></script> before </body>
 */
(function () {
  "use strict";

  if (document.querySelector(".doc-content")) return;

  var script = document.getElementById("adot-doc-nav");
  var depth = script ? parseInt(script.getAttribute("data-depth") || "0", 10) : 0;
  var prefix = depth > 0 ? new Array(depth + 1).join("../") : "";

  function docsPathTail() {
    var p = decodeURIComponent((location.pathname || "").replace(/\\/g, "/")).toLowerCase();
    var marker = "/docs/";
    var i = p.indexOf(marker);
    if (i !== -1) return p.slice(i + marker.length);
    var parts = p.split("/").filter(Boolean);
    if (parts.length >= 2) return parts.slice(-2).join("/");
    return (parts[parts.length - 1] || "master.html").toLowerCase();
  }

  var tail = docsPathTail();

  function active(href) {
    var h = href.toLowerCase();
    if (tail === h) return true;
    if (tail.endsWith("/" + h)) return true;
    return false;
  }

  function link(href, label) {
    var full = prefix + href;
    var cls = active(href) ? ' class="nav-active"' : "";
    return '<li><a href="' + full + '"' + cls + ">" + label + "</a></li>";
  }

  function group(title, items) {
    var inner = items.map(function (it) {
      return link(it.href, it.label);
    }).join("");
    return (
      "<details open><summary>" +
      title +
      "</summary><ul>" +
      inner +
      "</ul></details>"
    );
  }

  var navInner =
    '<p class="sidebar-title"><a href="' +
    prefix +
    'MASTER.html">DOCS</a></p>' +
    "<nav aria-label=\"Site\">" +
    "<ul class=\"sidebar-top\">" +
    link("MASTER.html", "MASTER") +
    "</ul>" +
    group("Sprints", [
      { href: "_SPRINTS/index.html", label: "Sprints index" },
      { href: "_SPRINTS/sprint-0.html", label: "Sprint 0 (execution)" },
      { href: "_SPRINTS/backlog.html", label: "Backlog (Act I)" },
    ]) +
    group("Story", [
      { href: "STORY/index.html", label: "STORY hub" },
      { href: "STORY/lore-world-rules.html", label: "Lore & world rules" },
      { href: "STORY/plot-and-acts.html", label: "Plot & acts" },
      { href: "STORY/dialogue-per-level.html", label: "Dialogue per level" },
      { href: "STORY/ritual.html", label: "The ritual" },
      { href: "STORY/endings.html", label: "Endings" },
    ]) +
    group("Characters", [
      { href: "CHARACTERS/index.html", label: "CHARACTERS hub" },
      { href: "CHARACTERS/protagonists.html", label: "Protagonists" },
      { href: "CHARACTERS/uncle.html", label: "The Uncle" },
      { href: "CHARACTERS/npcs.html", label: "NPCs" },
      { href: "CHARACTERS/enemy-archetypes.html", label: "Enemy archetypes" },
    ]) +
    group("Combat", [
      { href: "COMBAT/index.html", label: "COMBAT hub" },
      { href: "COMBAT/overview.html", label: "Overview" },
      { href: "COMBAT/move-sets.html", label: "Move sets" },
      { href: "COMBAT/encounter-philosophy.html", label: "Encounters" },
      { href: "COMBAT/budokai-chase.html", label: "Budokai chase" },
    ]) +
    group("Puzzles", [
      { href: "PUZZLES/index.html", label: "PUZZLES hub" },
      { href: "PUZZLES/philosophy.html", label: "Philosophy" },
      { href: "PUZZLES/designs-per-act.html", label: "Designs per act" },
      { href: "PUZZLES/mechanic-dependencies.html", label: "Mechanic deps" },
    ]) +
    group("Level design", [
      { href: "LEVEL_DESIGN/index.html", label: "LEVEL DESIGN hub" },
      { href: "LEVEL_DESIGN/act-i-forest-horizontal.html", label: "Act I beats (Forest)" },
      { href: "LEVEL_DESIGN/act-ii-moraine-horizontal.html", label: "Act II beats (Moraine)" },
      { href: "LEVEL_DESIGN/act-iii-death-zone-horizontal.html", label: "Act III beats (Death zone)" },
      { href: "LEVEL_DESIGN/cadence-per-act.html", label: "Cadence per act" },
      { href: "LEVEL_DESIGN/section-breakdown.html", label: "Section breakdown" },
      { href: "LEVEL_DESIGN/four-beat-rhythm.html", label: "Four-beat rhythm" },
      { href: "LEVEL_DESIGN/traversal-rules-level.html", label: "Traversal (level)" },
    ]) +
    group("Traversal", [
      { href: "TRAVERSAL/index.html", label: "TRAVERSAL hub" },
      { href: "TRAVERSAL/movement-and-states.html", label: "Movement & states" },
    ]) +
    group("Art & visual", [
      { href: "ART_VISUAL/index.html", label: "ART & VISUAL hub" },
      { href: "ART_VISUAL/identity-tone.html", label: "Identity & tone" },
      { href: "ART_VISUAL/colour-palette.html", label: "Colour palette" },
      { href: "ART_VISUAL/silhouette-language.html", label: "Silhouette language" },
      { href: "ART_VISUAL/vfx-specs.html", label: "VFX specs" },
      { href: "ART_VISUAL/planes-visual.html", label: "Planes (visual)" },
    ]) +
    group("Audio", [
      { href: "AUDIO/index.html", label: "AUDIO hub" },
      { href: "AUDIO/music-system.html", label: "Music system" },
      { href: "AUDIO/sound-philosophy.html", label: "Sound philosophy" },
      { href: "AUDIO/ritual-sound.html", label: "Ritual sound" },
      { href: "AUDIO/dialogue-delivery.html", label: "Dialogue delivery" },
    ]) +
    group("Technical", [
      { href: "TECHNICAL/index.html", label: "TECHNICAL hub" },
      { href: "TECHNICAL/unity-structure.html", label: "Unity structure" },
      { href: "TECHNICAL/performance-budgets.html", label: "Performance budgets" },
      { href: "TECHNICAL/mechanic-unlock-ladder.html", label: "Mechanic unlock ladder" },
      { href: "TECHNICAL/graybox-markers.html", label: "Graybox markers" },
    ]) +
    group("Production", [
      { href: "PRODUCTION/index.html", label: "PRODUCTION hub" },
      { href: "PRODUCTION/master-todo.html", label: "Master TODO" },
      { href: "PRODUCTION/iteration-checkpoints.html", label: "Checkpoints" },
      { href: "PRODUCTION/open-decisions-log.html", label: "Open decisions" },
      { href: "PRODUCTION/story-bible-reference.html", label: "Story bible reference" },
      { href: "PRODUCTION/changelog.html", label: "Changelog" },
    ]) +
    "</nav>" +
    '<p class="sidebar-hint">Open <code>DOCS/MASTER.html</code> in your browser (double-click). Links work offline.</p>';

  var aside = document.createElement("aside");
  aside.className = "doc-sidebar";
  aside.setAttribute("role", "navigation");
  aside.innerHTML = navInner;

  var skip = document.querySelector(".skip");

  var wrap = document.createElement("div");
  wrap.className = "doc-content";

  var kids = Array.prototype.slice.call(document.body.children);
  kids.forEach(function (el) {
    if (el.classList && el.classList.contains("skip")) return;
    if (el.id === "adot-doc-nav") return;
    wrap.appendChild(el);
  });

  if (skip && skip.parentNode === document.body) {
    if (skip.nextSibling) document.body.insertBefore(aside, skip.nextSibling);
    else document.body.appendChild(aside);
  } else {
    document.body.insertBefore(aside, document.body.firstChild);
  }

  document.body.insertBefore(wrap, aside.nextSibling);

  document.body.classList.add("has-doc-sidebar");
})();
