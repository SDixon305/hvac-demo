# Tasks: Configure Vercel Deployment and Naming Cleanup

## 1. Rename GitHub Repository
- [x] 1.1 Rename repo from `hvac-demo` to `solidframe` via GitHub web UI or CLI
- [x] 1.2 Update local git remote URL to new repo name
- [x] 1.3 Verify Vercel projects automatically reconnect to renamed repo

## 2. Configure solidframe Vercel Project (Static Site)
- [x] 2.1 Verify/create Vercel project `solidframe` linked to repo
- [x] 2.2 Set root directory to `site/`
- [x] 2.3 Set framework preset to "Other" (static)
- [x] 2.4 Verify domains: solidframe.ai, www.solidframe.ai
- [x] 2.5 Deploy and verify home page loads at solidframe.ai
- [x] 2.6 Verify HVAC landing page loads at solidframe.ai/hvac

## 3. Configure hvac-demo-app Vercel Project (Next.js)
- [x] 3.1 Verify/create Vercel project `hvac-demo-app` linked to repo
- [x] 3.2 Set root directory to `site/hvac/app/frontend/`
- [x] 3.3 Set framework preset to Next.js
- [x] 3.4 Configure environment variables:
  - NEXT_PUBLIC_SUPABASE_URL
  - NEXT_PUBLIC_SUPABASE_ANON_KEY
- [x] 3.5 Trigger deployment and verify build succeeds

## 4. Configure Custom Domain
- [x] 4.1 Add `hvac-demo.solidframe.ai` to hvac-demo-app Vercel project
- [x] 4.2 Add CNAME record in GoDaddy: hvac-demo → cname.vercel-dns.com
- [x] 4.3 Verify SSL certificate provisioned
- [x] 4.4 Test https://hvac-demo.solidframe.ai loads the Next.js dashboard

## 5. Update Documentation
- [x] 5.1 Update README.md with new repo name and deployment info
- [x] 5.2 Update openspec/project.md deployment section
- [x] 5.3 Complete remaining tasks in reorganize-site-structure change

## 6. Validation
- [x] 6.1 Verify solidframe.ai serves home landing page
- [x] 6.2 Verify solidframe.ai/hvac serves HVAC landing page
- [x] 6.3 Verify hvac-demo.solidframe.ai serves Next.js dashboard
- [ ] 6.4 Archive reorganize-site-structure change after all tasks complete

## Dependencies
- Task 2 and 3 require Task 1 completion (repo rename)
- Task 4 requires Task 3 completion (project must exist)
- Task 5 can run in parallel after Tasks 1-4
- Task 6 requires all other tasks complete

## Notes
- Environment variables are already set in Vercel for hvac-demo-app
- DNS is managed at GoDaddy (nameservers: ns45.domaincontrol.com, ns46.domaincontrol.com)
- GitHub provides automatic redirects after repo rename
