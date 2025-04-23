Hooks.once("init", function () {
    console.log("RuneScape RPG | Initializing system...");
    
    Handlebars.registerHelper("json", function(context) {
      // Stringify with indentation and wrap in a <pre> so it’s legible
      const str = JSON.stringify(context, null, 2);
      return new Handlebars.SafeString(`<pre>${str}</pre>`);
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
    }
  }
  