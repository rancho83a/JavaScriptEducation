import { getItemById, getRequestsByTeamId, requestToJoin, cancelMembership, approveMembership } from "../api/data.js"
import { html } from "../../node_modules/lit-html/lit-html.js"
import { until } from "../../node_modules/lit-html/directives/until.js"
import { loaderTemplate } from "./commom/loader.js";

const detailsTemplate = (item, isOwner, createControls, members, pending) => html`
<section id="team-home">
    <article class="layout">
        <img src=${item.logoUrl} class="team-logo left-col">
        <div class="tm-preview">
            <h2>${item.name}</h2>
            <p>${item.description}</p>
            <span class="details">${item.count} Members</span>
            <div>
                ${createControls()}

            </div>
        </div>
        <div class="pad-large">
            <h3>Members</h3>
            <ul class="tm-members">
            ${members.map(m=>memberTemplate(m, isOwner))}
            </ul>
        </div>
        ${isOwner ? 
            html`
        <div class="pad-large">
            <h3>Membership Requests</h3>
            <ul class="tm-members">
            ${pending.map(pendingTemplate)}
             </ul>
        </div>`
                   : ''}
       
    </article>
</section>
`;
const memberTemplate = (request, isOwner)=> html`
 <li>       ${request.user.username}
            ${isOwner ?  html`  <a @click =${request.decline} href="javascript:void(0)" class="tm-control action">Remove from team</a>`
           : ''}
 </li> `;

const pendingTemplate = (request)=>html`

<li>${request.user.username}<a @click=${request.approve} href="javascript:void(0)" class="tm-control action">Approve</a>
                            <a @click=${request.decline} href="javascript:void(0)"class="tm-control action">Decline</a></li>
`;

export async function detailsPage(ctx) {

    const teamId = ctx.params.id
    ctx.render(until(populateTemplate(teamId), loaderTemplate()));

    //TODO load members 

    async function populateTemplate(teamId) {
        const userId = sessionStorage.getItem('userId');

        const [item, requests] = await Promise.all([
            getItemById(teamId),
            getRequestsByTeamId(teamId)
        ]);
        requests.forEach(r=> {
            r.approve = (e)=> approve(e,r);
            r.decline = (e)=> leave(e,r._id)
        });
        const isOwner = userId == item._ownerId;
        const members =requests.filter(r=> r.status=="member");
        item.count = members.length;

        const pending = requests.filter(r=> r.status=="pending");
                               
        console.log(pending);
        return detailsTemplate(item, isOwner, createControls, members, pending);


        function createControls() {
            //guest visitor
            if (!ctx.isUser) {
                return "";
            }
            const request = requests.find(r => r._ownerId == userId);
            //curent user is Owner 
            if (isOwner) {
                return html`<a href=${`/edit/${item._id}`} class="action">Edit team</a>`;
            } else if (request && request.status == 'member') {
                //curent user is a member
                return html`<a  @click =${(ev)=> leave(ev,request._id)} href="javascript:void(0)" class="action invert">Leave team</a>`;
            } else if (request && request.status == 'pending') {
                //current user has a pending request
                return html`Membership pending. <a @click=${(ev) =>leave(ev,request._id)} href="javascript:void(0)">Cancel request</a>`;
            } else {
                //user is not related to the team
                return html`<a @click=${join} href="javascript:void(0)" class="action">Join team</a>`;
            }

            async function join(ev) {
                //ev.target.disabled=true;
                ev.target.remove();
                const req = await requestToJoin(teamId);
                ctx.render(await populateTemplate(teamId));
            }
        }

            async function leave(ev,requestId) {
                const confirmed = confirm("Are you sure?")
                if (confirmed) {
                    ev.target.remove();
                    await cancelMembership(requestId);
                    ctx.render(await populateTemplate(teamId));
                }
            }

            async function approve(ev, request){
                ev.target.remove();
            await approveMembership(request);
            ctx.render(await populateTemplate(teamId));
            }
        }   
    }



