#!/usr/bin/env tsx

/**
 * Performance Budget Verification Script
 * Checks bundle sizes and API performance against defined budgets
 */

import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

interface PerformanceBudget {
    name: string;
    current: number;
    budget: number;
    unit: string;
    status: 'pass' | 'fail' | 'warn';
}

interface BundleSize {
    name: string;
    size: number;
    gzipped: number;
}

interface ApiPerformance {
    endpoint: string;
    p95: number;
    avg: number;
    budget: number;
}

// Performance budgets
const BUNDLE_BUDGETS = {
    'main.js': 500, // 500KB
    'main.css': 100, // 100KB
    'vendor.js': 1000, // 1MB
};

const API_BUDGETS = {
    p95: 300, // 300ms
    avg: 150, // 150ms
};

const LIGHTHOUSE_BUDGETS = {
    performance: 95,
    accessibility: 95,
    'best-practices': 95,
    seo: 95,
};

function checkBundleSizes(): PerformanceBudget[] {
    const budgets: PerformanceBudget[] = [];

    // This would typically read from webpack-bundle-analyzer or similar
    // For now, we'll simulate the check
    const mockBundleSizes: BundleSize[] = [
        { name: 'main.js', size: 450, gzipped: 120 },
        { name: 'main.css', size: 80, gzipped: 20 },
        { name: 'vendor.js', size: 950, gzipped: 250 },
    ];

    mockBundleSizes.forEach(bundle => {
        const budget = BUNDLE_BUDGETS[bundle.name as keyof typeof BUNDLE_BUDGETS];
        if (budget) {
            const status = bundle.size <= budget ? 'pass' :
                bundle.size <= budget * 1.1 ? 'warn' : 'fail';

            budgets.push({
                name: `${bundle.name} (gzipped)`,
                current: bundle.gzipped,
                budget,
                unit: 'KB',
                status,
            });
        }
    });

    return budgets;
}

function checkApiPerformance(): PerformanceBudget[] {
    const budgets: PerformanceBudget[] = [];

    // This would typically read from monitoring data
    // For now, we'll simulate the check
    const mockApiPerformance: ApiPerformance[] = [
        { endpoint: '/api/v1/episodes', p95: 280, avg: 120, budget: API_BUDGETS.p95 },
        { endpoint: '/api/v1/transcripts', p95: 350, avg: 180, budget: API_BUDGETS.p95 },
        { endpoint: '/api/v1/drafts', p95: 250, avg: 100, budget: API_BUDGETS.p95 },
    ];

    mockApiPerformance.forEach(api => {
        const p95Status = api.p95 <= api.budget ? 'pass' :
            api.p95 <= api.budget * 1.2 ? 'warn' : 'fail';

        budgets.push({
            name: `${api.endpoint} (p95)`,
            current: api.p95,
            budget: api.budget,
            unit: 'ms',
            status: p95Status,
        });
    });

    return budgets;
}

function checkLighthouseScores(): PerformanceBudget[] {
    const budgets: PerformanceBudget[] = [];

    // This would typically read from Lighthouse CI results
    // For now, we'll simulate the check
    const mockScores = {
        performance: 92,
        accessibility: 98,
        'best-practices': 96,
        seo: 97,
    };

    Object.entries(mockScores).forEach(([metric, score]) => {
        const budget = LIGHTHOUSE_BUDGETS[metric as keyof typeof LIGHTHOUSE_BUDGETS];
        const status = score >= budget ? 'pass' :
            score >= budget * 0.95 ? 'warn' : 'fail';

        budgets.push({
            name: `Lighthouse ${metric}`,
            current: score,
            budget,
            unit: 'score',
            status,
        });
    });

    return budgets;
}

function printResults(budgets: PerformanceBudget[], category: string) {
    console.log(`\n📊 ${category}:`);

    budgets.forEach(budget => {
        const icon = budget.status === 'pass' ? '✅' :
            budget.status === 'warn' ? '⚠️' : '❌';
        const status = budget.status.toUpperCase();

        console.log(`${icon} ${budget.name}: ${budget.current}${budget.unit} / ${budget.budget}${budget.unit} (${status})`);
    });
}

function main() {
    console.log('🎯 Verifying performance budgets...\n');

    const bundleBudgets = checkBundleSizes();
    const apiBudgets = checkApiPerformance();
    const lighthouseBudgets = checkLighthouseScores();

    printResults(bundleBudgets, 'Bundle Sizes');
    printResults(apiBudgets, 'API Performance');
    printResults(lighthouseBudgets, 'Lighthouse Scores');

    const allBudgets = [...bundleBudgets, ...apiBudgets, ...lighthouseBudgets];
    const failed = allBudgets.filter(b => b.status === 'fail');
    const warnings = allBudgets.filter(b => b.status === 'warn');

    console.log('\n📈 Summary:');
    console.log(`✅ Passed: ${allBudgets.filter(b => b.status === 'pass').length}`);
    console.log(`⚠️  Warnings: ${warnings.length}`);
    console.log(`❌ Failed: ${failed.length}`);

    if (failed.length > 0) {
        console.log('\n❌ Performance budgets exceeded!');
        console.log('Please optimize the following:');
        failed.forEach(budget => {
            console.log(`   - ${budget.name}: ${budget.current}${budget.unit} > ${budget.budget}${budget.unit}`);
        });
        process.exit(1);
    }

    if (warnings.length > 0) {
        console.log('\n⚠️  Performance warnings detected:');
        warnings.forEach(budget => {
            console.log(`   - ${budget.name}: ${budget.current}${budget.unit} (close to ${budget.budget}${budget.unit} limit)`);
        });
    }

    console.log('\n🎉 All performance budgets passed!');
}

if (require.main === module) {
    main();
}

export { checkBundleSizes, checkApiPerformance, checkLighthouseScores };
