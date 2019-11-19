var app = new Vue({
  el: '#app',
  data: {
    rules: [],
    text: '',
    searchKey: '',
    show: 'all',
  },
  computed: {
    filteredItems() {
        return this.rules.filter(rule => {
          return rule.filtered;
        });
      return this.rules;
    },
  },
  created: function() {
    this.getRules();
  },
  methods: {
    async getRules() {
      try {
        const response = await axios.get("/api/rules");
        this.rules = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async addRule() {
      try {
        const response = await axios.post("/api/rules", {
          text: this.text,
          filtered: true
        });
        this.text = "";
        this.getRules();
      } catch (error) {
        console.log(error);
      }
    },
    async deleteRule(rule) {
      try {
        const response = await axios.delete("/api/rules/" + rule.id);
        this.getRules();
      } catch (error) {
        console.log(error);
      }
    },
    myFilter() {
      this.rules.forEach(rule => {
        this.filterRule(rule);
      });
    },
    async filterRule(rule) {
      try {
        if (rule.text.search(this.searchKey) === -1) {
          rule.filtered = false;
        }
        else {
          rule.filtered = true;
        }
        const response = await axios.post("/api/rules/" + rule.id);
        this.getRules();
      } catch (error) {
        console.log(error);
      }
    }
  },
});
