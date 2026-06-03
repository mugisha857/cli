#!/usr/bin/env node

import { select, input } from '@inquirer/prompts';
import degit from 'degit';
import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs/promises';

// ============================================
// ENTERPRISE SYSTEMS CONFIGURATION
// ============================================

const CATEGORIES = [
  {
    name: 'Stock and Inventory Management System',
    value: 'stock_inventory',
    projects: [
      {
        name: 'Stock Management System',
        value: 'stock_management',
        repo: 'mugisha857/stockhub-sms-app',
        tech: 'Node.js + React'
      },
      {
        name: 'Stock Inventory Management System',
        value: 'stock_inventory_management',
        repo: 'mugisha857/sims-app',
        tech: 'Node.js + React'
      },
      {
        name: 'Asset Inventory',
        value: 'asset_inventory',
        repo: 'mugisha857/ams',
        tech: 'Node.js + React'
      }
    ]
  },
  {
    name: 'Automotive and Vehicle Fleet System',
    value: 'vehicle_fleet',
    projects: [
      {
        name: 'Parking Space Sales Management System',
        value: 'parking_space_sales',
        repo: 'mugisha857/pssms',
        tech: 'Node.js + React'
      },
      {
        name: 'Parking Site Establish',
        value: 'parking_site_establish',
        repo: 'mugisha857/parking',
        tech: 'Node.js + React'
      },
      {
        name: 'Car Management System',
        value: 'car_management',
        repo: 'mugisha857/carapp',
        tech: 'Node.js + React'
      },
      {
        name: 'Car Rental Management',
        value: 'car_rental_management',
        repo: 'mugisha857/car-rental',
        tech: 'Node.js + React'
      }
    ]
  },
  {
    name: 'Employee and Resource Management',
    value: 'employee_resource',
    projects: [
      {
        name: 'Employee Payroll Management System',
        value: 'employee_payroll',
        repo: 'mugisha857/epms-app',
        tech: 'Node.js + React'
      },
      {
        name: 'Sales Management System',
        value: 'sales_management',
        repo: 'mugisha857/srms-app',
        tech: 'Node.js + React'
      },
      {
        name: 'Sales Record Management System',
        value: 'sales_record_management',
        repo: 'mugisha857/srms-app',
        tech: 'Node.js + React'
      }
    ]
  },
  {
    name: 'Core Academic and Infrastructure',
    value: 'academic_infrastructure',
    projects: [
      {
        name: 'Library Management System',
        value: 'library_management',
        repo: 'mugisha857/lms-app',
        tech: 'Node.js + React'
      },
      {
        name: 'Smart Warehouse Control',
        value: 'smart_warehouse_control',
        repo: 'mugisha857/warehouse',
        tech: 'Node.js + React'
      },
      {
        name: 'School Fee Management Control',
        value: 'school_fee_management',
        repo: 'mugisha857/sfms-app',
        tech: 'Node.js + React'
      }
    ]
  },
  {
    name: 'Health and Medical Environment',
    value: 'health_medical',
    projects: [
      {
        name: 'Pharmacy Expiry Monitor',
        value: 'pharmacy_expiry_monitor',
        repo: 'mugisha857/pharmacy',
        tech: 'Node.js + React'
      },
      {
        name: 'Supply Chain Management',
        value: 'supply_chain_management',
        repo: 'mugisha857/scms-app',
        tech: 'Node.js + React'
      }
    ]
  },
  {
    name : 'Fullstack Crud Operation',
    value : 'fullstack_crud',
    projects : [{
      name : 'Fullstack Crud Operation',
      value : 'fullstack_crud_operation',
      repo : 'mugisha857/crud-operation',
      tech : 'Node.js + React'
    }]
  }
];

// ============================================
// UI COMPONENTS
// ============================================

const displayHeader = () => {
  console.clear();
  console.log(`
═══════════════════════════════════════════════════════════════════════

                     🚀 UMUGISHA JOSEPH'S PROJECT HUB
                    Feel free to explore and contribute!

═══════════════════════════════════════════════════════════════════════

   ✨ 16 Enterprise Blueprints
   ✨ Production Progress
   ✨ Modern Tech Stack
   ✨ Rapid Development

═══════════════════════════════════════════════════════════════════════
`);
};

// ============================================
// PROJECT OPERATIONS
// ============================================

const cloneProject = async (repo, outputDir) => {
  // Fix: Force degit to look for the modern default 'main' branch if no branch tag (#) exists
  const repoTarget = repo.includes('#') ? repo : `${repo}#main`;

  const cloner = degit(repoTarget, {
    cache: false,
    force: true,
    verbose: false
  });

  await cloner.clone(outputDir);
  console.log('\n✅ Project downloaded successfully!');
  console.log(` Created folder: ./${path.basename(outputDir)}`);
};

const installDependencies = async (outputDir, folderName) => {
  const packageJsonPath = path.join(outputDir, 'package.json');

  try {
    await fs.access(packageJsonPath);
    console.log('\n📦 Installing dependencies...');
    execSync('npm install', {
      cwd: outputDir,
      stdio: 'inherit'
    });
    console.log(`\n🎉 Ready! Run:\ncd ${folderName} && npm run dev\n`);
  } catch {
    console.log(`\n⚡ No package.json found. Just run:\ncd ${folderName}`);
  }
};

// ============================================
// USER INTERACTION HELPERS
// ============================================

const selectCategory = async () => {
  const categoryValue = await select({
    message: 'Select Enterprise System:',
    choices: CATEGORIES.map(cat => ({
      name: cat.name,
      value: cat.value
    }))
  });
  
  return CATEGORIES.find(c => c.value === categoryValue);
};

const selectProject = async (category) => {
  const projectValue = await select({
    message: 'Select Project:',
    choices: category.projects.map(p => ({
      name: p.name,
      value: p.value
    }))
  });
  
  return category.projects.find(p => p.value === projectValue);
};

const getFolderName = async (project) => {
  const defaultFolder = project.value.replace(/_/g, '-');
  
  return await input({
    message: 'Enter folder name:',
    default: defaultFolder
  });
};

// ============================================
// MAIN APPLICATION
// ============================================

const displaySuccessMessage = (folderName) => {
  console.log('\n────────────────────────────────────────────────────────────');
  console.log('🙏 Thanks for using this tool');
  console.log('💖 Become a sponsor to support development');
  console.log('🚀 Join Developer Pay on MTN (MOMO CODE 1 33 94 96)');
  console.log('────────────────────────────────────────────────────────────\n');
};

const run = async () => {
  displayHeader();

  try {
    // Step 1: Select category
    const category = await selectCategory();
    
    // Step 2: Select project
    const project = await selectProject(category);
    
    if (!project?.repo) {
      throw new Error('Repository not found for selected project');
    }
    
    // Step 3: Get folder name
    const folderName = await getFolderName(project);
    const outputDir = path.join(process.cwd(), folderName);
    
    // Step 4: Display download information
    console.log(`\n📦 Downloading: ${project.name}`);
    console.log(`📁 Location: ./${folderName}\n`);
    
    // Step 5: Clone the project
    await cloneProject(project.repo, outputDir);
    
    // Step 6: Install dependencies
    await installDependencies(outputDir, folderName);
    
    // Step 7: Display success message
    displaySuccessMessage(folderName);
    
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
};

// Start the application
run();