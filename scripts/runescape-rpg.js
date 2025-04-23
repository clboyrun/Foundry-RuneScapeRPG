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

  console.log("RuneScape RPG | Registering PC Actor Sheet...");
  Actors.registerSheet("rsk", RuneScapeActorSheet, {
    types: ["Player Character"],
    label: "RuneScape Player",
    makeDefault: true,
  });

  CONFIG.Actor.documentClass = RuneScapeActor;
});

// Custom Actor class (basic for now)
class RuneScapeActor extends Actor {

  prepareData() {
    super.prepareData();
    // You can preprocess skills, stats here

    // Ensure inventory has 28 slots
    const inv = this.system.inventory || [];
    while (inv.length < 28) {
      inv.push(null);  // empty slots
    }
    this.system.inventory = inv;
  }
}

// Custom Sheet
class RuneScapeActorSheet extends ActorSheet {
  static get defaultOptions() {
    console.log("RuneScape RPG | Generating default...");
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["rsk", "sheet", "character", "actor"],
      template: "systems/rsk/templates/actor-sheet.hbs",
      width: 600,
      height: 400,
    });
  }

  getData() {
    console.log("RuneScape RPG | getData called");
    const baseData = super.getData();
    return {
      baseData,
      actor: this.actor,
      system: this.actor.system
    };
  }

  activateListeners(html) {
    console.log("RuneScape RPG | activateListeners called");
    super.activateListeners(html);

    // Add custom listeners here
    html.find(".skill-card").on("click", ev => {
      const skillName = ev.currentTarget.dataset.skill;
      ui.notifications.info(`Show details for ${skillName} (placeholder)`);
      // Later, open a sidebar or modal
    });

    // Tab switching logic
    html.find(".tab-buttons .tab").on("click", (event) => {
      const selectedTab = $(event.currentTarget).data("tab");

      // Set active class on tab button
      html.find(".tab-buttons .tab").removeClass("active");
      $(event.currentTarget).addClass("active");

      // Show selected tab content, hide others
      html.find(".tab-content").hide();
      html.find(`.tab-content[data-tab-content="${selectedTab}"]`).show();
    });

    // Trigger the first tab by default
    html.find(".tab-buttons .tab").first().trigger("click");
  }
}