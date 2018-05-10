<template>
    <v-card>
        <v-list two-line>
            <v-subheader>Auth</v-subheader>
            <v-list-tile>
                <v-list-tile-content>
                    <v-list-tile-title>Auth Status: {{ isAuthorized ? "Authorized" : "Not Authorized"}}</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-divider/>
            <v-subheader>General</v-subheader>
            <v-list-tile>
                <v-list-tile-content>
                    <v-list-tile-title>Status Prefix</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-divider/>
            <v-subheader>Others</v-subheader>
            <v-list-tile>
                <v-list-tile-content>
                     <v-list-tile-title>App Version</v-list-tile-title>
                     <v-list-tile-sub-title>hoge</v-list-tile-sub-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
                <v-list-tile-content>
                     <v-list-tile-title>Developer</v-list-tile-title>
                     <v-list-tile-sub-title>hoge</v-list-tile-sub-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
                <v-list-tile-content>
                     <v-list-tile-title>Rate on Chrome Webstore</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>
    </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState, mapGetters } from "vuex";
import { Component, Prop } from "vue-property-decorator";
import accessTokenRepository from "../../data/AccessTokenRepository";
import AccessToken from "../../data/AccessToken";

@Component({
    name: 'setting-list',
    computed: {
        ...mapState(['accessToken']),
        ...mapGetters(['isAuthorized'])
        }
})
export default class SettingList extends Vue {

    accessToken: AccessToken;

    mounted() {
    }

}
</script>
