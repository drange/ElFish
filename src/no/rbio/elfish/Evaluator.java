package no.rbio.elfish;

import java.util.ArrayList;
import java.util.List;

public class Evaluator {

	private final static double ITERATIONS = 7;

	public Evaluator() {

	}

	public static double doShit(List<Integer> lst) {
		if (lst.isEmpty())
			return 0;

		// k = number of removals

		int k = lst.size();

		// TOTAL CATCH
		double totalCatch = 0;
		for (int i = 0; i < k; i++) {
			totalCatch += lst.get(i);
		}

		double summand = 0;
		for (int i = 1; i <= k; i++) {
			summand += (i * lst.get(i - 1));
			System.out.println("Summand: " + summand);
		}
		summand = summand / totalCatch;

		System.out.println("Summand: " + summand);

		// c_1 / T can be used as first guess
		double q = lst.get(0) / totalCatch;

		for (int i = 1; i <= ITERATIONS; i++) {
			System.out.println(i + "\t" + q);
			q = iterate(summand, q, i);
		}

		System.out.println("q = " + q);

		double p = (1 - q);

		System.out.printf("%nCatchability is p = %.4f%n", p);
		return q;
	}

	public static double iterate(double summand, double q, int k) {
		System.out.println("iterate(" + summand + ", " + q + ", " + k + ")");
		double kqk = k * Math.pow(q, k);
		kqk /= (1 - Math.pow(q, k));

		System.out.println("\tkqk " + kqk);
		return (summand + kqk) * (1 - q);
	}

	public static void main(String... args) {
		ArrayList<Integer> l = new ArrayList<Integer>();
		for (int i = 0; i < args.length; i++) {
			l.add(Integer.parseInt(args[i]));
		}
		doShit(l);
	}
}
