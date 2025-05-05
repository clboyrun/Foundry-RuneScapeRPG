// Global variable to store previous positions of inventory slots
let oldRects = new Map();

// Custom Sheet
class RuneScapeActorSheet extends ActorSheet {
    static get defaultOptions() {
      console.log("RuneScape RPG | Generating RuneScapeActorSheet...");
      return foundry.utils.mergeObject(super.defaultOptions, {
        classes: ["rsk", "sheet", "character", "actor"],
        template: "systems/rsk/templates/actor-sheet.hbs",
        width: 400,
        height: "auto",
      });
    }
  
    getData() {
      console.log("RuneScape RPG | getData called");
      const baseData = super.getData();
      return {
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
  
      const grid = document.querySelector('#inventoryGrid');
  
      function captureRects() {
        const rects = new Map();
        grid.querySelectorAll('.inventory-slot').forEach(slot => {
          rects.set(slot, slot.getBoundingClientRect());
        });
        return rects;
      }
    
      function animateTransition(fromRects) {
        const toRects = captureRects();
    
        for (const [slot, from] of fromRects.entries()) {
          const to = toRects.get(slot);
          if (!to) continue;
    
          const dx = from.left - to.left;
          const dy = from.top - to.top;
          
          console.log(`RuneScape RPG | (${dx}px, ${dy}px)`);
    
          if (dx !== 0 || dy !== 0) {
            slot.style.transform = `translate(${dx}px, ${dy}px)`;
            slot.style.transition = 'none';
    
            // Force reflow
            slot.offsetWidth;
    
            // Trigger animation
            slot.style.transform = '';
            slot.style.transition = 'transform 2s ease';
          }
        }
      }
    
      const observer = new ResizeObserver(() => {
        requestAnimationFrame(() => {
          animateTransition(oldRects);
        });
        oldRects = captureRects();
      });
    
      observer.observe(grid);
    }
  }