<!-- eslint-disable vue/valid-v-slot -->
<template >
  <div id="app">
    <v-app>
      <v-container>
        <h1>Customer Management System</h1>

        <v-progress-linear v-if="loading" indeterminate color="primary"></v-progress-linear>

        <v-data-table
          v-if="customers && customers.length > 0"
      
          :items="customers"
          :items-per-page="10"
          :search="search"
          dark
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Customer List</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-text-field v-model="search" label="Search" dense outlined></v-text-field>
              <v-spacer></v-spacer>
              <v-btn @click="openCreateDialog" color="primary">Create Customer</v-btn>
            </v-toolbar>
          </template>
     <!-- Hardcoded headers -->
 <!-- Hardcoded headers -->
 <template v-slot:header>
      <thead>
        <tr>
          <th v-for="header in headers" :key="header.text">
            {{ header.text }}
          </th>
          <th>Actions</th>
        </tr>
      </thead>
    </template>
          <template v-slot:item="{ item }">
            
            <tr>
            
              <td>{{ item.customerID }}</td>
              <td>{{ item.firstName }}</td>
              <td>{{ item.lastName }}</td>
              <td>{{ item.email }}</td>
              <td>{{ item.phoneNumber }}</td>
              <td class="text-center">
                <v-icon @click="openEditDialog(item)">mdi-pencil</v-icon>
                <v-icon @click="deleteCustomer(item.customerID)">mdi-delete</v-icon>
              </td>
            </tr>
          </template>
        </v-data-table>

        <v-alert v-if="error" type="error">{{ error }}</v-alert>
      </v-container>

      <!-- Create Dialog -->
      <v-dialog v-model="createDialog" max-width="500px">
        <v-card>
          <v-card-title>Create Customer</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="createCustomer">
              <v-text-field v-model="newCustomer.firstName" label="First Name" required></v-text-field>
              <v-text-field v-model="newCustomer.lastName" label="Last Name" required></v-text-field>
              <v-text-field v-model="newCustomer.email" label="Email" required></v-text-field>
              <v-text-field v-model="newCustomer.phoneNumber" label="Phone Number" required></v-text-field>
              <v-btn type="submit" color="primary">Save</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>

      <!-- Edit Dialog -->
      <v-dialog v-model="editDialog" max-width="500px">
        <v-card>
          <v-card-title>Edit Customer</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="saveEditedCustomer">
              <v-text-field v-model="editedCustomer.firstName" label="First Name" required></v-text-field>
              <v-text-field v-model="editedCustomer.lastName" label="Last Name" required></v-text-field>
              <v-text-field v-model="editedCustomer.email" label="Email" required></v-text-field>
              <v-text-field v-model="editedCustomer.phoneNumber" label="Phone Number" required></v-text-field>
              <v-btn type="submit" color="primary">Save</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-app>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      customers: null,
      loading: false,
      error: null,
      search: '',
      headers: [
        { text: 'ID', value: 'customerID' },
        { text: 'First Name', value: 'firstName' },
        { text: 'Last Name', value: 'lastName' },
        { text: 'Email', value: 'email' },
        { text: 'Phone Number', value: 'phoneNumber' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      createDialog: false,
      editDialog: false,
      newCustomer: {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
      },
      editedCustomer: {
        customerID: null,
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
      },
    };
  },
  mounted() {
    this.fetchCustomers();
  },
  methods: {
    async fetchCustomers() {
      try {
        this.loading = true;
        const response = await axios.get('http://localhost:5150/api/customers');
        this.customers = response.data;
      } catch (error) {
        this.error = 'Error fetching customer data';
      } finally {
        this.loading = false;
      }
    },

    openCreateDialog() {
      this.createDialog = true;
    },

    closeCreateDialog() {
      this.createDialog = false;
    },

    openEditDialog(customer) {
      this.editedCustomer = { ...customer };
      this.editDialog = true;
    },

    closeEditDialog() {
      this.editDialog = false;
      this.editedCustomer = {
        customerID: null,
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
      };
    },

    async saveEditedCustomer() {
      try {
        // Call your API endpoint to update the customer details
        await axios.put(`http://localhost:5150/api/customers/${this.editedCustomer.customerID}`, this.editedCustomer);
        // After saving, close the edit dialog and refresh the customer list
        this.closeEditDialog();
        await this.fetchCustomers();
      } catch (error) {
        console.error('Error saving edited customer:', error);
      }
    },

    async createCustomer() {
      try {
        // Call your API endpoint to create a new customer
        await axios.post('http://localhost:5150/api/customers', this.newCustomer);
        // After creating, close the create dialog and refresh the customer list
        this.closeCreateDialog();
        await this.fetchCustomers();
      } catch (error) {
        console.error('Error creating customer:', error);
      }
    },

    async deleteCustomer(customerID) {
      try {
        await axios.delete(`http://localhost:5150/api/customers/${customerID}`);
        await this.fetchCustomers(); // Refresh the data after deletion
      } catch (error) {
        console.error('Error deleting customer:', error);
      }
    },
  },
};
</script>

<style></style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #ffffff!important; /* Set text color to white for the entire app */
  background-color: #121212; /* Set background color to a dark color */
  margin-top: 60px;
}
span {
  color: #ffffff!important;
}
h1 {
  font-size: 2em;
  margin-bottom: 20px;
}

/* Dark theme for Vuetify data table */
.v-data-table {
  background-color: #1e1e1e; /* Set background color for the data table */
  color: #ffffff; /* Set text color to white for the data table */
}

/* Dark theme for Vuetify data table header text on hover */
.v-data-table-header th:hover {
  color: #ffffff!important; /* Set text color to white for the header on hover */
}

/* Dark theme for Vuetify data table rows */
.v-data-table tbody tr {
  color: #ffffff; /* Set text color to white for the rows */
}

/* Dark theme for Vuetify data table rows on hover */
.v-data-table tbody tr:hover {
  background-color: #2e2e2e; /* Set background color for rows on hover */
}





