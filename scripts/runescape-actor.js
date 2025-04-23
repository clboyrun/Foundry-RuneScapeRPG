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