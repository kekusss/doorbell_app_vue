<template>
  <div class="login-page vh-90">
    <b-container>
      <b-row class="d-flex justify-content-center align-items-center my-5">

        <modal v-if="showModal" @close="showModal = false" :file="fileName"/>

        <b-col md="12" class="d-flex justify-content-center align-items-center">
          <b-table
              :current-page="currentPage"
              :empty-text="emptyText"
              :fields="fieldsLogs"
              :items="logs"
              :per-page="perPage"
              hover
              show-empty
              stacked="md"
              striped
          >
            <template #cell(snapshot)="row">
              <b-button class="mr-1 mt-1" size="sm" variant="info" @click="openModal(row)">
                Snapshot
              </b-button>
            </template>
          </b-table>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="8" offset-md="2">
          <b-pagination
              v-model="currentPage"
              :per-page="perPage"
              :total-rows="totalRows"
              align="fill"
              class="my-0"
              size="sm"
          ></b-pagination>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<style>
.vh-90{
  height: 90vh;
}
</style>

<script>

import DbService from "../services/db.service";
import {onValue} from "firebase/database";
import Modal from "@/components/Modal";

  export default {
    name: 'Log',
    components: {
      Modal
    },
    data() {
      return {
        fieldsLogs: [
          {key: 'event', label: 'Event', sortable: true},
          {key: 'description', label: 'Description'},
          {key: 'datetime', label: 'Time of occurrence', sortable: true},
          {key: 'snapshot', label: 'Snapshot', class: 'text-center'}
        ],
        logs: [],
        emptyText: 'Your event log is empty. ',
        showModal: false,
        fileName: '',
        currentPage: 1,
        perPage: 10,
        totalRows: 1,
      };
    },
    created() {
      this.getLogs();
    },
    methods: {
      parseToTable(data){
        const results_tmp = [];
        for (const idx in data) {
          results_tmp.push(
              {
                id: data[idx].id,
                event: data[idx].event,
                description: data[idx].description,
                datetime: data[idx].datetime,
                snapshot: data[idx].fileName
              }
          );
        }
        this.totalRows = results_tmp.length
        this.logs = results_tmp;
      },
      getLogs() {
        const email = this.$store.state.user.email;

        const logsRef = DbService.getLogsRef(email);
        onValue(logsRef, (snapshot) => {
          const data = snapshot.val();
          this.parseToTable(data)
        })
      },
      openModal(row){
        this.fileName = row.value;
        this.showModal = true;
      }
    }
  };
</script>