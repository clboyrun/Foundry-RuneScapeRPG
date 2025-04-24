Hooks.once("init", function () {
  console.log("RuneScape RPG | Initializing system...");
  
  Handlebars.registerHelper("json", function(context) {
    // Stringify with indentation and wrap in a <pre> so it’s legible
    const str = JSON.stringify(context, null, 2);
    return new Handlebars.SafeString(`<pre>${str}</pre>`);
  });
  // Capitalize helper: uppercases the first letter of each word
  Handlebars.registerHelper("capitalize", function(str) {
    if ( typeof str !== "string" ) return "";
    return str.replace(/\b\w/g, char => char.toUpperCase());
  });

  console.log("RuneScape RPG | Unregistering core...");
  Actors.unregisterSheet("core", ActorSheet);
  Items.unregisterSheet("core", ItemSheet); // Optional: Remove default 

  console.log("RuneScape RPG | Registering PC Actor Sheet...");
  Actors.registerSheet("rsk", RuneScapeActorSheet, {
    types: ["Player Character"],
    label: "RuneScape Player",
    makeDefault: true,
  });

  // Spells

  console.log("RuneScape RPG | Registering Spell Sheet...");
  Items.registerSheet("rsk", RuneScapeSpellSheet, {
    types: ["spell"],
    label: "RuneScape Spell",
    makeDefault: true
  });

  CONFIG.Actor.documentClass = RuneScapeActor;
  CONFIG.Item.documentClass = RuneScapeItem;
});
